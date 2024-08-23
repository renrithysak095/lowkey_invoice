"use client";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import {
  FormatSquare,
  GalleryAdd,
  TextalignCenter,
  TextalignLeft,
  TextalignRight,
  TextItalic,
  Trash,
} from "iconsax-react";
import TextIncreaseOutlinedIcon from "@mui/icons-material/TextIncreaseOutlined";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  boxBorders,
  fontFamilies,
  fontSizes,
  fontStyles,
  fontWeights,
  textAligns,
  textDecorations,
} from "@/app/types/MockData";

const DesignComponent = ({

  getID,
  setHeaderItems,
  headerItems,
  footerItems,
  setFooterItems,
}: any) => {
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const handleStyleChange = (field: any, value: any) => {
   
    if (getID) {
      setHeaderItems((prevState: any) => {
        const newItems = prevState.items.map((item: any) =>
          item.key === getID
            ? { ...item, data: { ...item.data, [field]: value } }
            : item
        );
        return { ...prevState, items: newItems };
      });
      setFooterItems((prevState: any) => {
        const newItems = prevState.items.map((item: any) =>
          item.key === getID
            ? { ...item, data: { ...item.data, [field]: value } }
            : item
        );
        return { ...prevState, items: newItems };
      });
    }
    if (contextMenuRef.current) {
      contextMenuRef.current.style.display = "block";
    } else {
      console.warn("Context menu ref is undefined.");
    }
  };
  // console.log(headerItems);

  const [isChanging, setIsChanging] = useState(false);

  const [finalColor, setFinalColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  const isMouseDownRef = useRef(false);

  const handleMouseDown = useCallback(() => {
    isMouseDownRef.current = true;
  }, []);

  const handleMouseUp = useCallback(() => {
    isMouseDownRef.current = false;
  }, []);

  const handleColorChange = useCallback((key:any,e: any) => {
 
    if (!isMouseDownRef.current) {
      setFinalColor(e.target.value);
      console.log("Final color:",key,  e.target.value);
      let field = "color";
      let bg = "backgroundColor";

      if (!isChanging) {
        if (getID) {
          setHeaderItems((prevState: any) => {
            const newItems = prevState.items.map((item: any) =>
              item.key === getID
                ? { ...item, data: { ...item.data, [key]: e.target.value } }
                : item
            );
            return { ...prevState, items: newItems };
          });
          setFooterItems((prevState: any) => {
            const newItems = prevState.items.map((item: any) =>
              item.key === getID
                ? { ...item, data: { ...item.data, [key]: e.target.value } }
                : item
            );
            return { ...prevState, items: newItems };
          });
        }
        if (contextMenuRef.current) {
          contextMenuRef.current.style.display = "block";
        } else {
          console.warn("Context menu ref is undefined.");
        }
      }
    }
  }, [getID]);

  const handleDeleteBox = () => {
    // console.log(getID);
    setHeaderItems((prevHeaderItems: any) => {
      const newItems = prevHeaderItems.items.filter(
        (item: any) => item.key !== getID
      );
      const newLayout = prevHeaderItems.layout.filter(
        (layoutItem: any) => layoutItem.i !== getID
      );
      return {
        ...prevHeaderItems,
        items: newItems,
        layout: newLayout,
      };
    });
    setFooterItems((prevHeaderItems: any) => {
      const newItems = prevHeaderItems.items.filter(
        (item: any) => item.key !== getID
      );
      const newLayout = prevHeaderItems.layout.filter(
        (layoutItem: any) => layoutItem.i !== getID
      );
      return {
        ...prevHeaderItems,
        items: newItems,
        layout: newLayout,
      };
    });
  };
  useEffect(() => {}, [headerItems]);

  return (
    <div className="pr-2">
      <div className="text-base flex flex-col">
        {/* <p className="font-medium border-b border-geay-100 mb-2 ">Text</p> */}
       
        <div className="my-1">
          <div className="text-sm">
            <p className="font-medium ">Text Decoration</p>
          </div>
          <div className="flex gap-2 flex-wrap  text-xs my-2">
          {fontStyles.map((style) => (
              <button
                key={style}
                className="p-1 border border-gray-100 rounded-md  hover:bg-gray-200"
                onClick={() => handleStyleChange("fontStyle", style)}
              >
                <div className="">
                  <div className="flex gap-2">
                    {style === "not-italic" && (
                      <span className="">Normal</span>
                    )}
                    {style === "italic" && (
                     <> <TextItalic size="18" color="#000000" variant="Bold" /></>
                    )}
                   
                  </div>
                </div>
              </button>
            ))}
            {textDecorations.map((text) => (
              <button
                key={text}
                className="p-1 px-2 border border-gray-100 rounded-md  hover:bg-gray-200"
                onClick={() => handleStyleChange("textDecoration", text)}
              >
                <div className="">
                  <div className="flex gap-2">
                   
                    {text === "underline" && (
                      <span className="underline">A</span>
                    )}
                   
                    {text === "overline" && (
                      <span className="overline"> A</span>
                    )}
                   
                    {text === "line-through" && (
                      <span className="line-through">A</span>
                    )}
                   
                    {text === "no-underline" && (
                      <span className="no-underline"> A</span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="my-1">
          <div className="text-sm">
            <p className="font-medium ">Text Align</p>
          </div>
          <div className="flex gap-2 flex-wrap  text-xs my-2">
            {textAligns.map((align) => (
              <button
                key={align}
                className="p-2 border border-gray-100 rounded-md  hover:bg-gray-200"
                onClick={() => handleStyleChange("textAlign", align)}
              >
                <div className="">
                  <div className="flex gap-2">
                    {align === "text-left" && (
                      <TextalignLeft size="18" color="#000000" className="" />
                    )}
                    {align === "text-center" && (
                      <TextalignCenter size="18" color="#000000" className="" />
                    )}
                    {align === "text-right" && (
                      <TextalignRight size="18" color="#000000" className="" />
                    )}
                    {align.replace("text-", "")}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="my-1">
          <div className="text-sm">
            <p className="font-medium ">Font Size</p>
            {/* <input onChange={(e)=>{
              handleStyleChange("fontSize", e.target.value)
            }} /> */}
          </div>
          <div className="flex gap-2 flex-wrap  text-xs my-2">
            {fontSizes.map((size) => (
              <button
                key={size}
                className="p-2 border border-gray-100 rounded-md  hover:bg-gray-200"
                onClick={() => handleStyleChange("fontSize", size)}
              >
                <div className="">{size.replace("text-", "")}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="my-1">
          <div className="text-sm">
            <p className="font-medium ">Font Weight</p>
          </div>
          <div className="flex gap-2 flex-wrap  text-xs my-2">
            {fontWeights.map((weight) => (
              <button
                key={weight}
                className="p-2 border border-gray-100 rounded-md  hover:bg-gray-200"
                onClick={() => handleStyleChange("fontWeight", weight)}
              >
                <div className="">{weight.replace("font-", "")}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="my-1">
          <div className="text-sm">
            <p className="font-medium ">Font Family</p>
          </div>
          <div className="flex gap-2 flex-wrap  text-xs my-2">
            {fontFamilies.map((family) => (
              <button
                key={family}
                className="p-2 border border-gray-100 rounded-md  hover:bg-gray-200"
                onClick={() => handleStyleChange("fontFamily", family)}
              >
                <div className="">{family.replace("font-", "")}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="my-1  py-2 ">
          <div className="text-sm">
            <p className="font-medium ">Text Color</p>
          </div>
          <div className="my-1">
            <Input
              size="sm"
              type="color"
              value={finalColor}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onChange={(e)=>{
                handleColorChange("color", e)
              }}
            />
          </div>
        </div>

        <div className="my-1  py-2 ">
          <div className="text-sm">
            <p className="font-medium ">Background Color</p>
          </div>
          <div className="my-1">
            <Input
              size="sm"
              type="color"
              value={bgColor}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onChange={(e)=>{
                handleColorChange("backgroundColor", e)
              }}
            />
          </div>
        </div>

        <div className="my-1  py-2 ">
          <div className="text-sm">
            <p className="font-medium ">Border</p>
          </div>
          <div className="flex gap-2 flex-wrap  text-xs my-2">
            {boxBorders.map((border) => (
              <button
                key={border}
                className="p-2 border border-gray-100 rounded-md  hover:bg-gray-200"
                onClick={() => handleStyleChange("boxBorder", border)}
              >
             {border}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2 py-2  w-full">
          <Button
            variant="light"
            onClick={() => {
              handleDeleteBox();
            }}
            className="flex px-2 w-full items-center justify-start text-sm gap-2 rounded-lg text-[#E4003A] "
          >
            <div className="bg-[#E4003A]  text-white rounded-lg p-1">
              <Trash size="16" variant="Bold" color="#ffffff" />
            </div>
            <p> Delete</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DesignComponent;
