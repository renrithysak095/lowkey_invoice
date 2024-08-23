import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import axios from "axios";
import { Copy, GalleryAdd, Paintbucket, Text } from "iconsax-react";
import React, { useEffect, useRef, useState } from "react";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import Image from "next/image";
import TextFieldsIcon from "@mui/icons-material/TextFields";
const ElementsComponent = ({
  headerItems,
  setHeaderItems,
  bodyItems,
  setBodyItems,
  footerItems,
  setFooterItems,
}: any) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const fileUploadRefQR = useRef<HTMLInputElement>(null);
  const [KHQR, setKHQR] = useState("");
  useEffect(() => {
    let draggableEl = document.getElementById("draggable-el");
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          let title = eventEl.getAttribute("title");
          let price = eventEl.getAttribute("price");
          let desc = eventEl.getAttribute("desc");
          let id = eventEl.getAttribute("data");
          let start = eventEl.getAttribute("start");
          return { title, price, desc, id, start };
        },
      });
    }
  }, []);

  const mockQR = [
    {
      key: "qrcode",
      data: {
        type: "money",
        value: `R21,677,291`,
        fontSize: "text-sm",
        fontFamily: "font-mono font-siemreap",
        fontWeight: "font-semibold",
        textAlign: "text-left",
        letterSpace: "  leading-normal",
        boxBorder: "border-b",
      },
    },
  ];

  const addNewItem = (type: any) => {
    const newItem = {
      key: `item_${headerItems.items.length + 1}`,
      data: {
        type,
        value: type === "text" ? "New Text" : "",
        src: type === "image" ? "https://via.placeholder.com/150" : "",
        alt: type === "image" ? "Placeholder Image" : "",
        fontSize: "",
        fontWeight: "",
        fontFamily: "",
        letterSpace: "",
        color: "",
        textAlign: "",
      },
    };
    setHeaderItems((prevState: any) => ({
      ...prevState,
      items: [...prevState.items, newItem],
      layout: [
        ...prevState.layout,
        {
          i: newItem.key,
          x: (prevState.items.length * 2) % 12,
          y: Infinity,
          w: 2,
          h: 2,
        },
      ],
    }));
  };
  const addNewFooterItem = (type: any) => {
    const newItem = {
      key: `footer_${footerItems.items.length + 1}`,
      data: {
        type,
        value: type === "text" ? "New Text" : "",
        src: type === "image" ? "https://via.placeholder.com/150" : "",
        alt: type === "image" ? "Placeholder Image" : "",
        fontSize: "",
        fontWeight: "",
        fontFamily: "",
        letterSpace: "",
        color: "",
        textAlign: "",
      },
    };
    setFooterItems((prevState: any) => ({
      ...prevState,
      items: [...prevState.items, newItem],
      layout: [
        ...prevState.layout,
        {
          i: newItem.key,
          x: (prevState.items.length * 2) % 12,
          y: Infinity,
          w: 2,
          h: 2,
        },
      ],
    }));
  };

  const handleUploadButtonClick = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };
  const handleUploadQR = () => {
    if (fileUploadRefQR.current) {
      fileUploadRefQR.current.click();
    }
  };

  const handleImageUpload = async (e: any) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file, "filename.jpg");
      const response = await axios.post(
        `https://inv-api.kosign.dev/api/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure the content type is set correctly
          },
        }
      );
      const image = `https://inv-api.kosign.dev/api/files/${response.data}`;
      console.log("Checcking: ", response.data);
      addNewItemWithImage(image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addNewItemWithImage = (imageUrl: any) => {
    // setHeaderItems((prev: any) => {
    //   const newItems = prev.items.filter(
    //     (item: any) => item.key !== "logo"
    //   );
    //   const newLayout = prev.layout.filter(
    //     (layoutItem: any) => layoutItem.i !== "logo"
    //   );
    //   return {
    //     ...prev,
    //     items: newItems,
    //     layout: newLayout,
    //   };
    // });
    const newItem = {
      key: `header_${headerItems.items.length + 1}`,
      data: {
        type: "image",
        value: imageUrl,
        alt: "Uploaded Image",
        src: imageUrl,
      },
    };

    setHeaderItems((prevState: any) => ({
      ...prevState,
      items: [...prevState.items, newItem],
      layout: [
        ...prevState.layout,
        {
          i: newItem.key,
          x: (prevState.items.length * 2) % 12,
          y: Infinity,
          w: 2,
          h: 5,
          minH: 2,
          minW: 1,
          maxH: 6,
          maxW: 2,
        },
      ],
    }));
  };

  const handleQRUpload = async (e: any) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append("file", file, "filename.jpg");
      const response = await axios.post(
        `https://inv-api.kosign.dev/api/files/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const image = `https://inv-api.kosign.dev/api/files/${response.data}`;
      console.log("Checcking: ", response.data);
      setKHQR(image);
      addNewQrcode(image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addNewQrcode = (imageUrl: any) => {
    setFooterItems((prev: any) => {
      const newItems = prev.items.filter(
        (item: any) => item.key !== "khqr_code"
      );
      const newLayout = prev.layout.filter(
        (layoutItem: any) => layoutItem.i !== "khqr_code"
      );
      return {
        ...prev,
        items: newItems,
        layout: newLayout,
      };
    });

    const newItem = {
      key: `khqr_code`,
      data: {
        type: "image",
        value: imageUrl,
        alt: "Uploaded Image",
        src: imageUrl,
      },
    };

    setFooterItems((prevState: any) => ({
      ...prevState,
      items: [...prevState.items, newItem],
      layout: [
        ...prevState.layout,
        {
          i: newItem.key,
          x: 0,
          y: 0,
          w: 2,
          h: 7,
          maxW: 4,
          maxH: 10,
          minW: 1,
          minH: 1,
        },
      ],
    }));
  };

  const addNewVatPin = (type: any) => {
    const newItem = {
      key: `item_${footerItems.items.length + 1}`,
      data: {
        type,
        value: "L000-000000000",
        fontSize: "text-[10px]",
      },
    };
    // console.log(newItem);
    setHeaderItems((prevState: any) => ({
      ...prevState,
      items: [...prevState.items, newItem],
      layout: [
        ...prevState.layout,
        {
          i: newItem.key,
          x: ((prevState.items.length * 2) % 12) + 1,
          y: Infinity,
          w: 5,
          h: 1,
          maxW: 6,
          maxH: 1,
          minW: 4,
          minH: 1,
        },
      ],
    }));
  };

  const addNewTable = (type: any) => {
      const newTable = {
        key: type,
        data: {
          type: "table",
          content: [
            {
              thead: ["No", "Description", "Quantity", "Unit Price", "Amount"],
              props: {
                border: "border-1",
                fontFamily: "font-poppins",
                fontSize: "text-sm",
                fontWeight: "font-bold",
                textTransform: "none",
                backgroundColor: "#f4f4f4",
                color: "#000",
                textAlign: "text-center",
                padding: "p-2",
                whiteSpace: "whitespace-pre",
                lineHeight: "leading-normal",
              },
            },
            {
              tbody: [
                {
                  no: 1,
                  description: ``,
                  unit_price: ``,
                  quantity: ``,
                  amount: ``,
                  // subRow: [
                  //   {
                  //     description: `- Ordinary Guard (Male)`,
                  //     unit_price: `$330.00`,
                  //     quantity: `1`,
                  //     amount: `$330.00`,
                  //     subRow1: [],
                  //   },
                  //   {
                  //     description: `- Ordinary Guard (Female)`,
                  //     unit_price: `$430.00`,
                  //     quantity: `2`,
                  //     amount: `$860.00`,
                  //     subRow1: [
                  //       {
                  //         description: `- Sub Row 1`,
                  //         unit_price: `$330.00`,
                  //         quantity: `1`,
                  //         amount: `$330.00`,
                  //       },
                  //       {
                  //         description: `- Sub Row 2`,
                  //         unit_price: `$330.00`,
                  //         quantity: `1`,
                  //         amount: `$330.00`,
                  //       },
                  //     ],
                  //   },
                  // ],
                },
              ],
              props: {
                border: "border-b",
                fontFamily: "font-mono",
                fontSize: "text-sm",
                fontWeight: "", //font-bold
                textTransform: "uppercase",
                backgroundColor: "#fff",
                color: "#000",
                textAlign: "",
                padding: "p-1",
                whiteSpace: "whitespace-pre",
                lineHeight: "leading-normal",
              },
            },
          ],
        },
      }
      setBodyItems((prevState: any) => {
        const itemExists = prevState.items.some((item: any) => item.key === newTable.key);
    
        if (itemExists) {
          return prevState;
        }
    
        return {
          ...prevState,
          items: [...prevState.items, newTable],
          layout: [
            ...prevState.layout,
            {
              i: newTable.key,
              x: (prevState.items.length * 2) % 12,
              y: Infinity,
              w: 12,
              h: 4,
              static: false,
              minH: 3,
              minW: 10,
              maxH: 10,
              maxW: 10,
            },
          ],
        };
      });
  };

  return (
    <div className="pr-2">
      <div className="mt-2" id="draggable-el">
        <p className="text-tiny text-foreground-400">Add New</p>
        <Accordion
          className=" text-base shadow-sm"
          isCompact
          defaultExpandedKeys={["1"]}
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Text Box"
            className=""
          >
            <Button
              variant="light"
              className="px-2  py-1 w-full rounded-lg"
              onClick={() => addNewItem("text")}
            >
              <div className="flex w-full items-center cursor-pointer rounded-lg transition-all text-sm">
                <span className="bg-black text-white mr-2 rounded-md">
                  {/* <Text size={16} /> */}
                  <TextFieldsIcon fontSize="medium" className="p-1" />
                </span>
                <span>Add Header Text</span>
              </div>
            </Button>

            <Button
              variant="light"
              className="px-2 mb-2 mt-1 py-1 w-full rounded-lg"
              onClick={() => addNewFooterItem("text")}
            >
              {" "}
              <div className="flex w-full items-center cursor-pointer rounded-lg transition-all text-sm">
                <span className="bg-black text-white mr-2 rounded-md">
                  <TextFieldsIcon fontSize="medium" className="p-1" />
                </span>
                <span>Add Footer Text</span>
              </div>
            </Button>
          </AccordionItem>
        </Accordion>

        <Button
          variant="light"
          className="px-2 mb-1 mt-2 py-1 w-full rounded-lg"
          onClick={handleUploadButtonClick}
        >
          <div className="flex w-full items-center cursor-pointer rounded-lg transition-all text-sm">
            <span className="bg-black text-white mr-2 p-1 rounded-md">
              <GalleryAdd size={16} />
            </span>
            <span>Add Image</span>
          </div>
        </Button>

        <Button
          variant="light"
          className="px-2 mb-1 py-1 w-full rounded-lg"
          onClick={() => addNewVatPin("vat_1")}
        >
          <div className="flex w-full items-center cursor-pointer rounded-lg transition-all text-sm">
            <span className="bg-black text-white mr-2 p-1 rounded-md">
              <Copy size={16} />
            </span>
            <span>Pin Number</span>
          </div>
        </Button>
        <Button
          variant="light"
          className="px-2 py-1 w-full rounded-lg"
          onClick={() => addNewTable("table")}
        >
          <div className="flex w-full items-center cursor-pointer rounded-lg transition-all text-sm">
            <span className="bg-black text-white mr-2 p-1 rounded-md">
              <Copy size={16} />
            </span>
            <span>Add Table</span>
          </div>
        </Button>
      </div>

      <div className="mt-3 fc-event">
        <p className="text-tiny  text-foreground-400">Components</p>
        <div
          onClick={handleUploadQR}
          className="mt-2 flex h-[100px] cursor-pointer items-center bg-foreground-100 rounded-md transition-all"
        >
          <Image
            src={
              `${KHQR}`
                ? `${KHQR}`
                : `https://opengameart.org/sites/default/files/Transparency500.png`
            }
            alt={`QRCode`}
            width={100}
            height={100}
            className="rounded-lg w-[80px] object-cover h-[100px] p-1"
          />

          <div className="ml-3 font-siemreap text-[8px] flex flex-col justify-between h-full py-1.5">
            <p>
              វិធីបង់ប្រាក់ <br /> Payment Method
            </p>
            <p>
              Bank Name <br /> Phnom Penh Commercial Bank{" "}
            </p>
            <p>
              Billing Accound no. <br />
              0-000-00000000-0
            </p>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileUploadRef}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleQRUpload}
        style={{ display: "none" }}
        ref={fileUploadRefQR}
      />
    </div>
  );
};

export default ElementsComponent;
