import React, { useEffect, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";
import InsertVatNumber from "../others/InsertVatNumber";
import { saveTemplateService } from "@/app/service/Templates.service";
import { useDispatch } from "react-redux";
import { pushAlert } from "@/app/redux/sampleSlice";
import SaveInvoiceTemplateComponent from "../others/SaveInvoiceTemplateComponent";
import PrintComponent from "./PrintComponent";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import { Printer } from "iconsax-react";
import html2pdf from 'html2pdf.js';

export default function PreviewInvoice({
  headerItems,
  setHeaderItems,
  bodyProps,
  setBodyProps,
  footerItems,
  setFooterItems,
  openMode,
  setOpenMode,
  template,
  setTemplate,
}: any) {
  const printRef = useRef(null);
  const handleCloseModal = () => {
    setOpenMode(false);
  };
  const VatTin = (pin: string, itemKey: any) => {
    setHeaderItems((prevState: any) => {
      const newItems = prevState.items.map((item: any) =>
        item.key === "vat_tin_1"
          ? { ...item, data: { ...item.data, value: pin } }
          : item
      );
      return { ...prevState, items: newItems };
    });
  };
  const [combinetemplate, setCombineTemplate] = useState({
    headerItems: {},
    bodyProps: {},
    footerItems: {},
  });
  useEffect(() => {
    setCombineTemplate((prev) => ({ ...prev, headerItems: headerItems, bodyProps: bodyProps, footerItems: footerItems }));
  }, [headerItems, bodyProps, footerItems])


  console.log(combinetemplate);
  const dispatch = useDispatch();
  const handleSaveInvoiceTemplate = (
    type: string,
    time: string,
    invName: string
  ) => {
    setTemplate((prev: any) => ({ ...prev, templateName: invName }));
    if (template.templateName === "") {
      dispatch(
        pushAlert({
          open: true,
          type: "error",
          message: "Invoice Can not Empty.",
          duration: 1600,
        })
      );
      return;
    }

    saveTemplateService(template, type, time).then((response) => {
      if (response.status === 200) {
        dispatch(
          pushAlert({
            open: true,
            type: "success",
            message: "Invoice Created Successfully",
            duration: 1600,
          })
        );
      } else {
        dispatch(
          pushAlert({
            open: true,
            type: "error",
            message: "Invoice Create Failed",
            duration: 1600,
          })
        );
      }
      handleCloseModal();
    });
  };


  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    // onBeforePrint: () => console.log("before printing..."),
    // onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  const handleGeneratePDF = useReactToPrint({
    content: () => printRef.current,
    print: async (printIframe: HTMLIFrameElement) => {
      const document = printIframe.contentDocument;
      if (document) {
        const html = document.getElementsByTagName('html')[0];
        const opt = {
          margin: 0,
          filename: 'document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        await html2pdf().from(html).set(opt).save();
      }
    }
  });



  return (
    <div className="h-full ">
      {/* <Button onPress={onOpen}>Open Modal</Button> */}
      <Modal
        isOpen={openMode}
        onOpenChange={() => {
          handleCloseModal();
        }}
        scrollBehavior="outside"
        placement="top"
        size="5xl"
        className="min-w-[700px] my-0 sm:my-4 mx-0"
        isDismissable={false}
      >
        <ModalContent className="">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1 border-b">
                Prview Invoice
              </ModalHeader>
              <ModalBody className="p-0 w-full px-3 py-0  bg-white">
                {/* Header */}
                <div className=" px-2">
                  <GridLayout
                    key={"grid-layout"}
                    className="layout mt-8"
                    layout={headerItems.layout}
                    cols={12}
                    rowHeight={25}
                    width={1000}
                    margin={[0, 5]}
                    compactType="vertical"
                    isResizable={false}
                    isDraggable={false}
                  >
                    {headerItems?.items?.map((item: any, index: any) => {
                      return (
                        <div
                          key={item.key}
                          className="parentGrid relative w-full z-10 h-full group "
                        >
                          {item.data.type === "text" && (
                            <div
                              style={{
                                color: `${item.data?.color}`,
                                backgroundColor: `${item.data?.backgroundColor}`,
                              }}
                              className={`rounded-sm h-full ${item.data?.boxBorder}  ${item.data.fontSize} ${item.data?.fontWeight} ${item.data?.fontFamily} ${item.data?.letterSpace} ${item.data?.fontStyle}  ${item.data?.backgroundColor}  ${item.data?.textAlign}`}
                            >
                              {item.data.value}
                            </div>
                          )}

                          {item.data.type === "image" && (
                            <div
                              className={`relative w-full h-full ${item.data?.boxBorder} `}
                            >
                              <Image
                                className="w-full rounded-md h-full absolute top-0 left-0 p-1 object-cover"
                                width={300}
                                height={100}
                                src={`${item.data.value ? item.data.value : ""}`}
                                alt={`${item.data.alt}`}
                              />
                            </div>
                          )}
                          {item.data.type === "vat_1" && (
                            <div
                              style={{
                                backgroundColor: `${item.data?.backgroundColor}`,
                                color: `${item.data?.color}`,
                              }}
                              className={`relative p-[1px] ${item.data?.boxBorder} `}
                              aria-readonly
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
                              className={`w-full h-full ${item.data?.boxBorder}  rounded-sm `}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </GridLayout>
                </div>

                {/* Body */}
                <div>
                  <GridLayout
                    className="layout font-poppins -z-0"
                    layout={bodyProps.layout}
                    cols={12}
                    rowHeight={30}
                    width={1000}
                    margin={[0, 0]}
                    isResizable={false}
                    isDraggable={false}
                  >
                    <div key="table" className="p-2">
                      <table className="border-collapse table-auto w-full h-full z-50">
                        {bodyProps.items
                          .filter((item: any) => item.data.type === "table")
                          .map((item: any, contentIndex: any) => {
                            const thItem = item.data?.content[0];
                            return (
                              <thead key={contentIndex + 1}>
                                <tr
                                  style={{
                                    backgroundColor: thItem.props
                                      .backgroundColor
                                      ? thItem.props.backgroundColor
                                      : "transparent",
                                    color: thItem.props.color
                                      ? thItem.props.color
                                      : "#000",
                                  }}
                                >
                                  {thItem?.thead?.map(
                                    (item: any, index: any) => (
                                      <td
                                        key={index}
                                        className={`${Object.values(
                                          thItem.props
                                        ).join(" ")}`}
                                      >
                                        {item}
                                      </td>
                                    )
                                  )}
                                </tr>
                              </thead>
                            );
                          })}
                        {bodyProps.items
                          .filter((item: any) => item.data.type === "table")
                          .map((item: any, index: any) => {
                            const tbitem = item.data?.content[1];
                            return (
                              <tbody key={index + 1}>
                                {tbitem?.tbody?.map(
                                  (bodyItem: any, bodyIndex: any) => (
                                    <tr
                                      style={{
                                        backgroundColor: tbitem.props
                                          .backgroundColor
                                          ? tbitem.props.backgroundColor
                                          : "transparent",
                                        color: tbitem.props.color
                                          ? tbitem.props.color
                                          : "#000",
                                      }}
                                      key={bodyIndex}
                                    >
                                      <td
                                        className={Object.values(
                                          tbitem.props
                                        ).join(" ")}
                                      >
                                        {bodyItem.no}
                                      </td>
                                      <td
                                        className={`${Object.values(
                                          tbitem.props
                                        ).join(" ")}`}
                                      >
                                        <span>{bodyItem.description}</span>
                                        <span>
                                          {bodyItem.subRow.map(
                                            (sub: any, index: any) => (
                                              <div
                                                key={index}
                                                className="flex flex-col"
                                              >
                                                <span className="indent-8">
                                                  {sub.description}
                                                </span>
                                                {sub.subRow1.map(
                                                  (sub1: any, i: any) => (
                                                    <span
                                                      key={i}
                                                      className="indent-16"
                                                    >
                                                      {sub1.description}
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
                                          tbitem.props
                                        ).join(" ")}`}
                                      >
                                        <span>{bodyItem.quantity}</span>
                                        <span>
                                          {bodyItem.subRow.map(
                                            (sub: any, index: any) => (
                                              <div
                                                key={index}
                                                className="flex flex-col"
                                              >
                                                <span>{sub.quantity}</span>
                                                {sub.subRow1.map(
                                                  (sub1: any, i: any) => (
                                                    <span key={i}>
                                                      {sub1.quantity}
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
                                          tbitem.props
                                        ).join(" ")}`}
                                      >
                                        <span>{bodyItem.unit_price}</span>
                                        <span>
                                          {bodyItem.subRow.map(
                                            (sub: any, index: any) => (
                                              <div
                                                key={index}
                                                className="flex flex-col"
                                              >
                                                <span>{sub.unit_price}</span>
                                                {sub.subRow1.map(
                                                  (sub1: any, i: any) => (
                                                    <span key={i}>
                                                      {sub1.unit_price}
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
                                          tbitem.props
                                        ).join(" ")}`}
                                      >
                                        <span>{bodyItem.amount}</span>
                                        <span>
                                          {bodyItem.subRow.map(
                                            (sub: any, index: any) => (
                                              <div
                                                key={index}
                                                className="flex flex-col"
                                              >
                                                <span>{sub.amount}</span>
                                                {sub.subRow1.map(
                                                  (sub1: any, i: any) => (
                                                    <span key={i}>
                                                      {sub1.amount}
                                                    </span>
                                                  )
                                                )}
                                              </div>
                                            )
                                          )}
                                        </span>
                                      </td>
                                    </tr>
                                  )
                                )}
                              </tbody>
                            );
                          })}
                      </table>
                    </div>
                  </GridLayout>
                </div>

                {/* Footer */}
                <div className="pb-10 min-h-[600px] bg-white">
                  <GridLayout
                    key={"grid-layout"}
                    className="layout mt-8"
                    layout={footerItems.layout}
                    cols={12}
                    rowHeight={25}
                    margin={[0, 5]}
                    width={1000}
                    compactType="vertical"
                    isResizable={false}
                    isDraggable={false}
                  >
                    {footerItems?.items?.map((item: any, index: any) => {
                      return (
                        <div
                          key={item.key}
                          className="parentGrid relative w-full z-10 h-full group "
                        >
                          {item.data.type === "text" && (
                            <div
                              style={{
                                color: `${item.data?.color}`,
                                backgroundColor: `${item.data?.backgroundColor}`,
                              }}
                              className={`rounded-sm h-full ${item.data?.boxBorder} ${item.data?.whiteSpace} ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data?.fontStyle} ${item.data.letterSpace} ${item.data?.textAlign}`}
                            >
                              {item.data.value}
                            </div>
                          )}
                          {item.data.type === "money" && (
                            <div
                              style={{
                                color: `${item.data?.color}`,
                                backgroundColor: `${item.data?.backgroundColor}`,
                              }}
                              className={`rounded-sm h-full ${item.data?.boxBorder} ${item.data?.whiteSpace} ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data?.fontStyle} ${item.data.letterSpace} ${item.data?.textAlign}`}
                            >
                              {item.data.value}

                              {/* <div className="border-b border-gray-200 mt-1"></div> */}
                            </div>
                          )}
                          {item.data.type === "list" && (
                            <div
                              style={{
                                color: `${item.data?.color}`,
                                backgroundColor: `${item.data?.backgroundColor}`,
                              }}
                              className={`rounded-sm pl-2 flex gap-3 h-full list-disc z-90 ${item.data?.boxBorder} ${item.data?.whiteSpace} ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data?.fontStyle} ${item.data.letterSpace} ${item.data?.textAlign}`}
                            >
                              <div className="flex mt-2">
                                {" "}
                                <span className="w-[5px] h-[5px] rounded-full bg-black">
                                  {" "}
                                </span>{" "}
                              </div>
                              {item.data.value}
                            </div>
                          )}
                          {item.data.type === "image" && (
                            <div className=" w-full h-full ${item.data?.boxBorder} ">
                              <Image
                                className=" w-full h-full object-cover rounded-lg p-1"
                                width={200}
                                height={300}
                                src={
                                  `${item.data.value ? item.data.value : ""}` ||
                                  `https://inv-api.kosign.dev/api/files/29d3260e-24b1-46d0-98a7-2fad131ac1fb.jpg`
                                }
                                alt={`${item.data.alt}`}
                              />
                            </div>
                          )}
                          {item.data.type === "space" && (
                            <div
                              className={`w-full h-full rounded-sm ${item.data?.boxBorder} ${item.data?.whiteSpace}`}
                            ></div>
                          )}
                        </div>
                      );
                    })}
                  </GridLayout>
                </div>
              </ModalBody>

              <ModalFooter>
                <div className="flex justify-between w-full">
                  <div className="w-full flex items-center">
                    <Button onClick={handlePrint} size="sm" startContent={<Printer size={18} />} color="default">Print</Button>
                    <Button onClick={handleGeneratePDF} color="primary" className="ml-2" size="sm">Save PDF</Button>
                  </div>
                  <div className="w-full flex justify-end">
                    <Button
                      size="sm"
                      className="mr-3"
                      color="danger"
                      variant="flat"
                      onClick={() => {
                        handleCloseModal();
                      }}
                    >
                      Close
                    </Button>
                    <SaveInvoiceTemplateComponent
                      handleSaveInvoiceTemplate={handleSaveInvoiceTemplate}
                    />
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <PrintComponent
        ref={printRef}
        template={combinetemplate}
      />
    </div>
  );
}
