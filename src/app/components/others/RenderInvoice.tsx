import React, { useEffect, useState } from 'react'
import InsertVatNumber from '../others/InsertVatNumber';
import GridLayout from "react-grid-layout";
import Image from 'next/image';
import { fillTemplateService } from '@/app/service/Templates.service';
const RenderInvoice = ({ id, apiKey, json }: any) => {

    // Table Data
    const [temData, setTemData] = useState<any>();
    const [tBodyStyle, setTbodyStyle] = useState<any>();
    const [thItem, setThItem] = useState<any>();

    console.log("json", json);

    useEffect(() => {
        const fetchTemplate = async () => {
            const result = await fillTemplateService({ id, apiKey, json });
            if (result) {
                console.log("OK: ", result?.data?.body?.content)
                setTbodyStyle(result?.data?.body?.content?.items[0]?.data?.content[0]);
                setThItem(result?.data?.body?.content?.items[0]?.data?.content[0]);
                setTemData(result?.data);
            }
        };
        fetchTemplate();
    }, [id, apiKey, json])


    return (
        <div className='h-[700px] relative overflow-y-scroll'>
            <div className="">
                <GridLayout
                    key={"grid-layout"}
                    className="layout mt-8"
                    layout={temData?.header?.content?.layout}
                    cols={12}
                    rowHeight={25}
                    width={1024}
                    compactType="vertical"
                    isResizable={false}
                    isDraggable={false}
                >
                    {temData?.header?.content?.items?.map((item: any, index: any) => {
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
                                            onComplete={""}
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
            <div className=''>
                <GridLayout
                    className="layout font-poppins -z-0"
                    layout={temData?.body?.content?.layout}
                    cols={12}
                    rowHeight={30}
                    width={1024}
                    margin={[0, 0]}
                    isResizable={false}
                    isDraggable={false}
                >
                    <div key="table" className="p-2">
                        <table className="border-collapse table-auto w-full h-full z-50">
                            {/* {temData?.body?.content?.items
                                ?.filter((item: any) => item.data.type === "table")
                                .map((item: any, contentIndex: any) => {
                                    const thItem? = temData?.body?.content?.items[0].data.content[0]
                                    temData?.body?.content?.items[0].data.content[0]
                                    setTbodyStyle(item.data?.content[1])
                                    return (
                                        
                                    );
                                })} */}
                            <thead key={"table"}>
                                <tr
                                    style={{
                                        backgroundColor: thItem?.props
                                            .backgroundColor
                                            ? thItem?.props.backgroundColor
                                            : "transparent",
                                        color: thItem?.props.color
                                            ? thItem?.props.color
                                            : "#000",
                                    }}
                                >
                                    {thItem?.thead?.map(
                                        (item: any, index: any) => (
                                            <td
                                                key={index}
                                                className={Object.values(
                                                    thItem?.props
                                                ).join(" ") || ""}
                                            >
                                                {item}
                                            </td>
                                        )
                                    )}
                                </tr>
                            </thead>

                            {json?.table?.map((item: any, index: any) => {
                                const tbitem = tBodyStyle;
                                return (
                                    <tbody key={index + 1}>
                                        <tr
                                            style={{
                                                backgroundColor: tbitem?.props
                                                    ?.backgroundColor
                                                    ? tbitem?.props?.backgroundColor
                                                    : "transparent",
                                                color: tbitem?.props?.color
                                                    ? tbitem?.props?.color
                                                    : "#000",
                                            }}
                                            key={index}
                                        >
                                            <td
                                                className={Object.values(
                                                    tbitem?.props || ""
                                                ).join(" ") || ""}
                                            >
                                                {item?.no}
                                            </td>
                                            <td
                                                className={Object.values(
                                                    tbitem?.props || ""
                                                ).join(" ") || ""}
                                            >
                                                <span>{item?.description}</span>
                                                <span>
                                                    {item?.children.map(
                                                        (sub: any, index: any) => (
                                                            <div
                                                                key={index}
                                                                className="flex flex-col"
                                                            >
                                                                <span className="indent-8">
                                                                    {sub?.description}
                                                                </span>
                                                                {sub?.children.map(
                                                                    (sub1: any, i: any) => (
                                                                        <span
                                                                            key={i}
                                                                            className="indent-16"
                                                                        >
                                                                            {sub1?.description}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </span>
                                            </td>
                                            <td
                                                className={Object.values(
                                                    tbitem?.props || ""
                                                ).join(" ") || ""}
                                            >
                                                <span>{item?.quantity}</span>
                                                <span>
                                                    {item?.children?.map(
                                                        (sub: any, index: any) => (
                                                            <div
                                                                key={index}
                                                                className="flex flex-col"
                                                            >
                                                                <span>{sub?.quantity}</span>
                                                                {sub?.children1?.map(
                                                                    (sub1: any, i: any) => (
                                                                        <span key={i}>
                                                                            {sub1?.quantity}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </span>
                                            </td>
                                            <td
                                                className={Object.values(
                                                    tbitem?.props || ""
                                                ).join(" ") || ""}
                                            >
                                                <span>{item?.unit_price}</span>
                                                <span>
                                                    {item?.children.map(
                                                        (sub: any, index: any) => (
                                                            <div
                                                                key={index}
                                                                className="flex flex-col"
                                                            >
                                                                <span>{sub?.unit_price}</span>
                                                                {sub?.children1?.map(
                                                                    (sub1: any, i: any) => (
                                                                        <span key={i}>
                                                                            {sub1?.unit_price}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </span>
                                            </td>
                                            <td
                                                className={Object.values(
                                                    tbitem?.props || ""
                                                ).join(" ") || ""}
                                            >
                                                <span>{item?.amount}</span>
                                                <span>
                                                    {item?.children.map(
                                                        (sub: any, index: any) => (
                                                            <div
                                                                key={index}
                                                                className="flex flex-col"
                                                            >
                                                                <span>{sub?.amount}</span>
                                                                {sub?.children.map(
                                                                    (sub1: any, i: any) => (
                                                                        <span key={i}>
                                                                            {sub1?.amount}
                                                                        </span>
                                                                    )
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </table>
                    </div>
                </GridLayout>
            </div>

            {/* Footer */}
            <div className="pb-10">
                <GridLayout
                    key={"grid-layout"}
                    className="layout mt-8"
                    layout={temData?.footer?.content?.layout}
                    cols={12}
                    rowHeight={25}
                    width={1024}
                    compactType="vertical"
                    isResizable={false}
                    isDraggable={false}
                >
                    {temData?.footer?.content?.items?.map((item: any, index: any) => {
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
                                        className={`rounded-sm h-full ${item.data?.boxBorder}  ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data?.fontStyle} ${item.data.letterSpace} ${item.data?.textAlign}`}
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
                                        className={`rounded-sm h-full focus:border-dashed ${item.data?.boxBorder} ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data.letterSpace} ${item.data?.fontStyle} ${item.data?.textAlign}`}
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
                                        className={`rounded-sm pl-2 flex gap-3 h-full list-disc ${item.data?.boxBorder} z-90  ${item.data.fontSize} ${item.data.fontWeight} ${item.data.fontFamily} ${item.data?.fontStyle} ${item.data.letterSpace} ${item.data?.textAlign}`}
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
                                        <div>item.data.value : {item.data.value}</div>
                                        <Image
                                            className="w-full rounded-md h-full absolute top-0 left-0 p-1 object-cover"
                                            width={300}
                                            height={100}
                                            src={
                                                `${item.data.value ? item.data.value : ""}` ||
                                                `https://inv-api.kosign.dev/api/files/29d3260e-24b1-46d0-98a7-2fad131ac1fb.jpg`
                                            }
                                            alt={`${item.data.alt}`}
                                        />
                                    </div>
                                )}
                                {item.data.type === "space" && (
                                    <div className="w-full h-fullrounded-sm "></div>
                                )}
                            </div>
                        );
                    })}
                </GridLayout>
            </div>
        </div>
    )
}

export default RenderInvoice