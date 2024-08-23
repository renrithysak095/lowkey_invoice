"use client";
import Image from "next/image";
import React, { useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import UnstyledTextareaIntroduction from "../others/InputTextarea";
import { useDrop } from "react-dnd";

const GridFooter = ({
  setShowEdit,
  selectedTab,
  setSelectedTab,
  getID,
  setGetID,
  footerItems,
  setFooterItems,
}: any) => {
  const dropRefs = useRef<any>([]);
  const [newTextValue, setNewTextValue] = useState("");
  const [isClick, setIsClick] = useState<string | null>(null);

  const handleLayoutChange = (newLayout: any) => {
    setFooterItems((prevItems: any) => ({
      ...prevItems,
      layout: newLayout,
    }));
  };
  const handleTextChange = (value: any, key: any) => {
    console.log(value, "------------", key);
    setNewTextValue(value);
    if (key) {
      setFooterItems((prevState: any) => {
        const newItems = prevState.items.map((item: any) =>
          item.key === key
            ? { ...item, data: { ...item.data, value: value } }
            : item
        );
        return { ...prevState, items: newItems };
      });
    }
  };

  const [, drop]: any = useDrop({
    accept: "KEY_ITEM",
    drop: (item: any, monitor: any) => {
      const offset = monitor.getClientOffset();
      if (!offset) return;
      const dropIndex = dropRefs.current.findIndex(
        (ref: { getBoundingClientRect: () => any }) => {
          if (!ref) return false;
          const rect = ref.getBoundingClientRect();
          return (
            rect.left <= offset.x &&
            rect.right >= offset.x &&
            rect.top <= offset.y &&
            rect.bottom >= offset.y
          );
        }
      );
      if (dropIndex !== -1) {
        setFooterItems((prevItems: { items: any; layout: any[] }) => {
          const newItems = [...prevItems.items];
          newItems[dropIndex] = {
            ...newItems[dropIndex],
            key: item.key,
            data: {
              ...newItems[dropIndex].data,
              value: item.value,
            },
          };
          const newLayout = prevItems.layout.map((layoutItem, index) =>
            index === dropIndex ? { ...layoutItem, i: item.key } : layoutItem
          );

          return {
            ...prevItems,
            items: newItems,
            layout: newLayout,
          };
        });
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleClick = (e: any, itemKey: any) => {
    setSelectedTab("attributies");
    setShowEdit("show");
    setGetID(itemKey);
    setIsClick(itemKey);
  };


  return (
    <div className=" w-full min-h-[400px] max-h-full ">
      <div className=""></div>
      <div ref={drop}>
        <GridLayout
          key={"grid-layout"}
          className="layout"
          layout={footerItems.layout}
          cols={12}
          rowHeight={30}
          margin= {[0, 5]}
          width={1024}
          compactType="vertical"
          allowOverlap={false}
          onLayoutChange={handleLayoutChange}
        >
          {footerItems?.items?.map((item: any, index: any) => {
            return (
              <div
                onClick={(e) => {
                  handleClick(e, item.key);
                }}
                key={item.key}
                className="parentGrid relative w-full z-10 h-full group "
              >
                {item.data.type === "text" && (
                  <div
                    style={{
                      color: item.data?.color,
                      backgroundColor: item.data?.backgroundColor,
                      border: isClick === item.key ? "1px solid #4A90E2" : "",
                    }}
                    ref={(node: any) => (dropRefs.current[index] = node)}
                    className={`rounded-sm  h-full ${item.data?.boxBorder} focus:border-dashed focus:border-1 hover:border-dashed hover:border-1 hover:border-gray-300 ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data?.fontStyle} ${item.data.letterSpace} ${item.data?.textAlign}`}
                  >
                    <UnstyledTextareaIntroduction
                      textValue={item.data.value}
                      textAlign={item.data.textAlign}
                      fonstStyle={item.data?.fontStyle}
                      textDecoration={item.data?.textDecoration}
                      itemKey={item.key}
                      onTextChange={(newValue: any, itemKey: any) =>
                        handleTextChange(newValue, itemKey)
                      }
                    />
                  </div>
                )}
                {item.data.type === "money" && (
                  <div
                    style={{
                      color: item.data?.color,
                      backgroundColor: item.data?.backgroundColor,
                      border: isClick === item.key ? "1px solid #4A90E2" : "",
                    }}
                    ref={(node: any) => (dropRefs.current[index] = node)}
                    className={`rounded-sm h-full focus:border-dashed ${item.data?.boxBorder} focus:border-1 hover:border-dashed hover:border-1 hover:border-gray-300 ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data.letterSpace} ${item.data?.fontStyle} ${item.data?.textAlign}`}
                  >
                    <UnstyledTextareaIntroduction
                      textValue={item.data.value}
                      textAlign={item.data.textAlign}
                      fonstStyle={item.data?.fontStyle}
                      textDecoration={item.data?.textDecoration}
                      itemKey={item.key}
                      onTextChange={(newValue: any, itemKey: any) =>
                        handleTextChange(newValue, itemKey)
                      }
                    />
                  </div>
                )}
                {item.data.type === "list" && (
                  <div
                    style={{
                      color: item.data?.color,
                      backgroundColor: `${item.data?.backgroundColor}`,
                      border: isClick === item.key ? "1px solid #4A90E2" : "",
                    }}
                    ref={(node: any) => (dropRefs.current[index] = node)}
                    className={`rounded-sm pl-2 flex gap-3 h-full list-disc z-90 focus:border-dashed focus:border-1 hover:border-dashed hover:border-1 hover:border-gray-300 ${item.data?.boxBorder} ${item.data?.whiteSpace} ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data?.fontStyle} ${item.data.letterSpace} ${item.data?.textAlign}`}
                  >
                    <div className="flex mt-2">
                      <span className="w-[5px] h-[5px] rounded-full bg-black">
                        {" "}
                      </span>
                    </div>
                    <UnstyledTextareaIntroduction
                      textValue={item.data.value || 'New Text'}
                      textAlign={item.data.textAlign}
                      fonstStyle={item.data?.fontStyle}
                      textDecoration={item.data?.textDecoration}
                      itemKey={item.key}
                      onTextChange={(newValue: any, itemKey: any) =>
                        handleTextChange(newValue, itemKey)
                      }
                    />
                  </div>
                )}
                {item.data.type === "image" && (
                  <div
                    style={{
                      color: item.data?.color,
                      backgroundColor: `${item.data?.backgroundColor}`,
                      border: isClick === item.key ? "1px solid #4A90E2" : "",
                    }}
                    className={` w-full h-full ${item.data?.boxBorder} focus:border-dashed focus:border-1 hover:border-dashed hover:border-1 hover:border-gray-300`}
                    ref={(node: any) => (dropRefs.current[index] = node)}
                  >
                    <Image
                      className=" w-full h-full object-cover rounded-lg p-1"
                      width={200}
                      height={300}
                      src={
                        `${item.data.value}` ||
                        `https://opengameart.org/sites/default/files/Transparency500.png`
                      }
                      alt={`${item.data.alt}`}
                    />
                  </div>
                )}
                {item.data.type === "space" && (
                  <div className={`w-full h-full hover:border-gray-300  hover:border-dashed hover:border-1 rounded-sm ${item.data?.boxBorder}`}></div>
                )}
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
};

export default GridFooter;
