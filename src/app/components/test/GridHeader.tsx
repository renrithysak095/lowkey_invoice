import React, { useState, useRef, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import InsertVatNumber from "../others/InsertVatNumber";
import Image from "next/image";
import { useDrop } from "react-dnd";
import UnstyledTextareaIntroduction from "../others/InputTextarea";

const GridHeader = ({
  setShowEdit,
  setSelectedTab,
  selectedTab,
  setGetID,
  getID,
  setHeaderItems,
  headerItems,
}: any) => {
  const [layout, setLayout] = useState([]);
  const [editingItemKey, setEditingItemKey] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newTextValue, setNewTextValue] = useState("");
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });
  const [contextMenuTarget, setContextMenuTarget] = useState(null);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [openEditText, setOpenEditText] = useState(false);
  // Table state
  const [showTableModal, setShowTableModal] = useState(false);
  const [numRows, setNumRows] = useState(3);
  const [numCols, setNumCols] = useState(3);
  const [keyDel, setKeyDel] = useState("");
  const dropRefs = useRef<any>([]);
  const [isClick, setIsClick] = useState<string | null>(null);
  const divRef = useRef<any>(null);
  const attributeModeRef = useRef<any>(null);
  const modeRef = useRef<any>(null);

  const handleLayoutChange = (newLayout: any) => {
    setHeaderItems((prevItems: any) => ({
      ...prevItems,
      layout: newLayout,
    }));
  };

  const handleDivClick = (e: any, key: any, value: any) => {
    e.preventDefault();
    setEditingItemKey(key);
    setNewTextValue(value);
    setIsEditing(true);
  };

  const handleContextMenu = (e: any, key: any, value: any) => {
    e.preventDefault();
    setKeyDel(key);
    if (contextMenuTarget === e.target) {
      setContextMenuPosition({ x: 0, y: 0 });
      setContextMenuTarget(null);
      if (contextMenuRef.current) {
        contextMenuRef.current.style.display = "none";
      } else {
        console.warn("Context menu ref is undefined.");
      }
    } else {
      setEditingItemKey(key);
      setNewTextValue(value);
      setContextMenuPosition({ x: e.clientX - 150, y: e.clientY - 50 });
      setContextMenuTarget(e.target);
      if (contextMenuRef.current) {
        contextMenuRef.current.style.display = "block";
      } else {
        console.warn("Context menu ref is undefined.");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      setIsClick("")
      if (
        contextMenuRef.current &&
        !contextMenuRef.current?.contains(e.target)
      ) {
        setContextMenuTarget(null);
        contextMenuRef.current.style.display = "none";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleTextChange = (value: any, key: any) => {
    setNewTextValue(value);
    if (key) {
      setHeaderItems((prevState: any) => {
        const newItems = prevState.items.map((item: any) =>
          item.key === key
            ? { ...item, data: { ...item.data, value: value } }
            : item
        );
        return { ...prevState, items: newItems };
      });
      setIsEditing(false);
    }
  };

  const VatTin = (pin: string, itemKey: any) => {
    console.log(pin, itemKey);
    setHeaderItems((prevState: any) => {
      const newItems = prevState.items.map((item: any) =>
        item.key === "vat_tin_1"
          ? { ...item, data: { ...item.data, value: pin } }
          : item
      );
      return { ...prevState, items: newItems };
    });
  };
// console.log(headerItems)
  const handleClick = (e: any, itemKey: any) => {
    setSelectedTab("attributies");
    setShowEdit("show");
    setGetID(itemKey);
    setIsClick(itemKey);
  };

  const [, drop]: any = useDrop({
    accept: "KEY_ITEM",
    drop: (item: any, monitor: any) => {
      console.log(item);
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
        setHeaderItems((prevItems: { items: any; layout: any[] }) => {
          const newItems = [...prevItems.items];
          console.log(newItems[dropIndex]);
          newItems[dropIndex] = {
            ...newItems[dropIndex],
            key: item.key,
            label: item.label,
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

  return (
    <div className="w-full px-2 min-h-[300px] max-h-full " ref={divRef}>
      <hr />
      <div ref={drop} className="">
        <GridLayout
          key={"grid-layout"}
          className="layout mt-8"
          layout={headerItems.layout}
          cols={12}
          rowHeight={23}
          margin= {[0, 5]}
          width={1024}
          compactType="vertical"
          allowOverlap={false}
          onLayoutChange={handleLayoutChange}
        >
          {headerItems?.items?.map((item: any, index: any) => {
            return (
              <div
                key={item.key}
                className="parentGrid relative w-full z-10 h-full group "
                onClick={(e) => {
                  handleClick(e, item.key);
                }}
                onContextMenu={(e) =>
                  handleContextMenu(e, item.key, item.data.value)
                }
                onDoubleClick={(e) => {
                  e.preventDefault;
                }}
              >
                {item.data.type === "text" && (
                  <div
                    onDoubleClick={(e) => {
                      e.preventDefault;
                    }}
                    style={{
                      color: item.data?.color,
                      backgroundColor: item.data?.backgroundColor,
                      border: isClick === item.key ? "1px solid #4A90E2" : "",
                    }}
                    ref={(node: any) => (dropRefs.current[index] = node)}
                    className={`rounded-sm flex text-sm items-center h-full focus:border-dashed focus:border-1 hover:border-dashed hover:border-1 p-0 hover:border-gray-300 ${item.data?.boxBorder}  ${item.data?.fontSize} ${item.data?.whiteSpace} ${item.data?.fontWeight} ${item.data?.fontFamily} ${item.data?.letterSpace} ${item.data?.fontStyle}  ${item.data?.backgroundColor}  ${item.data?.textAlign}`}
                  >
                    <UnstyledTextareaIntroduction
                      textValue={item.data.value || `New Text ${index + 1}`}
                      textAlign={item.data.textAlign}
                      fonstStyle={item.data?.fontStyle}
                      whiteSpace={item.data?.whiteSpace}
                      textDecoration={item.data?.textDecoration}
                      itemKey={item.key}
                      labelValue={item?.label}
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
                      backgroundColor: item.data?.backgroundColor,
                      border: isClick === item.key ? "1px solid #4A90E2" : "",
                    }}
                    className={`relative w-full h-full ${item.data?.boxBorder} focus:border-dashed focus:border-1 hover:border-dashed hover:border-1 hover:border-gray-300`}
                    ref={(node: any) => (dropRefs.current[index] = node)}
                  >
                    <Image
                      className="w-full rounded-md h-full absolute top-0 left-0 p-1 object-cover"
                      width={300}
                      height={100}
                      src={item.data.value ? item.data.value : "https://opengameart.org/sites/default/files/Transparency500.png"} 
                      alt={`${item.data.alt}`}
                    />
                  </div>
                )}
                {item.data.type === "vat_1" && (
                  <div
                    style={{
                      backgroundColor: `${item.data?.backgroundColor}`,
                      color: `${item.data?.color},`,
                      border: isClick === item.key ? "1px solid #4A90E2" : "",
                    }}
                    className={`relative p-[1px] ${item.data?.boxBorder} focus:border-dashed focus:border-1 hover:border-dashed hover:border-1 hover:border-gray-300`}
                    ref={(node: any) => (dropRefs.current[index] = node)}
                  >
                    <InsertVatNumber
                      itemKey={item.key}
                      length={10}
                      onComplete={VatTin}
                      tempValue={item.data.value}
                    />
                  </div>
                )}
                {item.data.type === "space" && (
                  <div
                    className={`w-full h-full hover:border-gray-300 ${item.data?.boxBorder} hover:border-dashed hover:border-1 rounded-sm `}
                  ></div>
                )}
               
              </div>
            );
          })}
        </GridLayout>
      </div>
    </div>
  );
};

export default GridHeader;
