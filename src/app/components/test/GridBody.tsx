import React, { useEffect, useMemo, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store/store";
import { setAttributeBlock } from "@/app/redux/propertiesSlice";

const GridBody = ({
  mode,
  setMode,
  setBodyItems,
  bodyItems,
  headerProps,
  bodyProps,
  handleSetElementProperties,
}: {
  mode: string;
  setMode: any;
  setBodyItems: any;
  bodyItems: BodyItemsState;
  headerProps: HeaderProps;
  bodyProps: HeaderProps;
  handleSetElementProperties: any;
}) => {
 

  const dispatch = useDispatch();
  const attributeBlock = useSelector(
    (state: RootState) => state?.properties.pushAttributeBlock
  );
  const attributeModeRef = useRef(attributeBlock);
  const modeRef = useRef(mode);

  useEffect(() => {
    attributeModeRef.current = attributeBlock;
    modeRef.current = mode;
  }, [attributeBlock, mode]);

  useEffect(() => {
    const calculateHeight = () => {
      const tableElement = document.querySelector(".layout .table-auto");
      console.log(tableElement)
      if (tableElement) {
        const tableHeight = tableElement.getBoundingClientRect().height;
        const gridHeight = Math.ceil(tableHeight / 30);

        console.log("tableHeight", gridHeight);
        console.log("gridHeight", gridHeight);
        setBodyItems((prevState: any) => ({
          ...prevState,
          layout: prevState?.layout.map((layoutItem: any) =>
            layoutItem.i === "table"
              ? { ...layoutItem, h: gridHeight, minH: gridHeight }
              : layoutItem
          ),
        }));
      }
    };

    calculateHeight();
  }, [bodyItems?.items]);

  const [layout, setLayout] = useState([]);

  const handleLayoutChange = (layout: any) => {
    setLayout(layout);
    setBodyItems((prev: any) => ({
      ...prev,
      layout,
    }));
    // console.log("on Change Layout : ", layout);
    // console.log("on Change bodyItems : ", bodyItems);
  };

  useEffect(() => {
    const updatedItems = bodyItems?.items?.map((item) => {
      if (item.key === "table") {
        const updatedContent = item.data.content.map(
          (content, contentIndex) => {
            if (contentIndex === 0) {
              // first content is the header
              return {
                ...content,
                props: headerProps,
              };
            }
            if (contentIndex === 1) {
              // first content is the Body
              return {
                ...content,
                props: bodyProps,
              };
            }
            return content;
          }
        );

        return {
          ...item,
          data: {
            ...item.data,
            content: updatedContent,
          },
        };
      }
      return item;
    });

    setBodyItems({ ...bodyItems, items: updatedItems });
  }, [headerProps, bodyProps]);

  const tableRef = useRef<any>(null);

  const handleTableClick = (elementType: any, index: number) => {
    const allTheads = document.querySelectorAll("thead");
    const allTbodies = document.querySelectorAll("tbody");

    // Remove focus from all theads and tbodies
    allTheads.forEach((element) => element.classList.remove("focused"));
    allTbodies.forEach((element) => element.classList.remove("focused"));

    // Add focus to the clicked element
    if (elementType === "thead") {
      allTheads[index].classList.add("focused");
    } else if (elementType === "tbody") {
      allTbodies[index].classList.add("focused");
    }
  };

  const handleClickOutside = (event: any) => {
    if (tableRef?.current && !tableRef?.current?.contains(event.target)) {
      const allTheads = document.querySelectorAll("thead");
      const allTbodies = document.querySelectorAll("tbody");
      if (attributeModeRef.current === "clicked") {
        setMode(modeRef.current);
      } else {
        allTheads.forEach((element) => element.classList.remove("focused"));
        allTbodies.forEach((element) => element.classList.remove("focused"));
        setMode("none");
      }
      dispatch(setAttributeBlock("none"));
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // console.log({ bodyItems });
  if (!bodyItems?.layout?.length) {
    return <div className="w-full min-h-[400px] max-h-full"></div>;
  }
  return (
    <>
      <div
        className="mt-4 table_body selection:select-none w-full min-h-[400px] max-h-full"
        ref={tableRef}
      >
        <GridLayout
          key={"grid-layout"}
          className="layout font-poppins -z-0"
          isDraggable={true}
          isResizable={true}
          layout={bodyItems?.layout}
          cols={12}
          rowHeight={30}
          width={1024}
          margin={[0, 0]}
          compactType={null}
          onLayoutChange={handleLayoutChange}
        >
          {bodyItems?.items?.map((item: any, index: any) => {
            return (
              <div key={item?.key} className="p-2 hover:border-dashed hover:border-1 hover:border-gray-300">
                <table className="border-collapse table-auto w-full z-50">
                  {bodyItems?.items
                    ?.filter((item) => item.data?.type === "table")
                    .map((item, contentIndex) => {
                      const thItem = item.data?.content[0];
                      return (
                        <thead
                          key={contentIndex + 1}
                          onClick={() =>
                            handleTableClick("thead", contentIndex)
                          }
                        >
                          <tr
                            onClick={() =>
                              handleSetElementProperties("Table_Head")
                            }
                            style={{
                              backgroundColor: thItem?.props?.backgroundColor
                                ? thItem?.props?.backgroundColor
                                : "transparent",
                              color: thItem?.props?.color
                                ? thItem?.props?.color
                                : "#000",
                            }}
                          >
                            {thItem?.thead?.map((item, index) => (
                              <td
                                key={index}
                                className={`${Object.values(
                                  thItem.props || ""
                                ).join(" ")}`}
                              >
                                {item}
                              </td>
                            ))}
                          </tr>
                        </thead>
                      );
                    })}
                  {bodyItems?.items
                    ?.filter((item) => item.data.type === "table")
                    .map((item, index) => {
                      const tbitem = item.data?.content[1];
                      return (
                        <tbody
                          key={index + 1}
                          onClick={() => handleTableClick("tbody", index)}
                        >
                          {tbitem?.tbody?.map((bodyItem, bodyIndex) => (
                            <tr
                              onClick={() =>
                                handleSetElementProperties("Table_Body")
                              }
                              style={{
                                backgroundColor: tbitem?.props?.backgroundColor
                                  ? tbitem?.props?.backgroundColor
                                  : "transparent",
                                color: tbitem?.props?.color
                                  ? tbitem?.props?.color
                                  : "#000",
                              }}
                              key={bodyIndex}
                            >
                              <td
                                className={Object.values(
                                  tbitem.props || ""
                                ).join(" ")}
                              >
                                {index + 1}
                              </td>
                              <td
                                className={`${Object.values(
                                  tbitem.props || ""
                                ).join(" ")}`}
                              >
                                <span>{bodyItem?.description 
                            }</span>
                                <span>
                                  {bodyItem?.subRow?.map(
                                    (sub: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <span className="indent-8">
                                          {sub?.description}
                                        </span>
                                        {sub.subRow1.map(
                                          (sub1: any, i: any) => (
                                            <span key={i} className="indent-16">
                                              {sub1?.description  
                                            }
                                            </span>
                                          )
                                        )}
                                      </div>
                                    )
                                  )}
                                </span>
                              </td>
                              <td
                                className={`${Object.values(tbitem?.props || "-").join(" ")}`}
                              >
                                <span>{bodyItem?.quantity  
                            }</span>
                                <span>
                                  {bodyItem?.subRow?.map(
                                    (sub: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <span>{sub?.quantity}</span>
                                        {sub?.subRow1?.map(
                                          (sub1: any, i: any) => (
                                            <span key={i}>
                                              {sub1?.quantity  }
                                            </span>
                                          )
                                        )}
                                      </div>
                                    )
                                  )}
                                </span>
                              </td>
                              <td
                                className={`${Object.values(
                                  tbitem?.props || ""
                                ).join(" ")}`}
                              >
                                <span>{bodyItem?.unit_price}</span>
                                <span>
                                  {bodyItem?.subRow?.map(
                                    (sub: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <span>{sub?.unit_price}</span>
                                        {sub?.subRow1?.map(
                                          (sub1: any, i: any) => (
                                            <span key={i}>
                                              {sub1?.unit_price }
                                            </span>
                                          )
                                        )}
                                      </div>
                                    )
                                  )}
                                </span>
                              </td>
                              <td
                                className={`${Object.values(
                                  tbitem?.props || ""
                                ).join(" ")}`}
                              >
                                <span>{bodyItem?.amount}</span>
                                <span>
                                  {bodyItem?.subRow?.map(
                                    (sub: any, index: any) => (
                                      <div
                                        key={index}
                                        className="flex flex-col"
                                      >
                                        <span>{sub?.amount}</span>
                                        {sub.subRow1.map(
                                          (sub1: any, i: any) => (
                                            <span key={i}>{sub1?.amount  
                                                
                                            }</span>
                                          )
                                        )}
                                      </div>
                                    )
                                  )}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      );
                    })}
                </table>
              </div>
            );
          })}
        </GridLayout>
      </div>
    </>
  );
};

export default GridBody;
