"use client";

import { Button, Skeleton } from "@nextui-org/react";
import { MouseSquare, User } from "iconsax-react";
import React, { use, useEffect, useState } from "react";
import GridHeader from "../components/test/GridHeader";
import GridBody from "../components/test/GridBody";
import ComponentTab from "../components/Elements/ComponentTab";
import ElementsComponent from "../components/Elements/ElementsComponent";
import DesignComponent from "../components/Elements/DesignComponent";
import ElementsKeyComponent from "../components/Elements/ElementsKeyComponent";
import { getElementsKeyService } from "../service/Element.service";
import DragCompo from "../components/test/DragCompo";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { data, DataBodyItems, dataFooter } from "../types/MockData";
import AttributesComponent from "../components/Elements/AttributesComponent";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { pushTab } from "../redux/sampleSlice";
import GridFooter from "../components/test/GridFooter";
import PreviewInvoice from "../components/Modal/PreviewInvoice";
import { redirect } from "next/navigation";

// const Page = () => {
//   const [bodyItems, setBodyItems] = useState<BodyItemsState>(DataBodyItems);
//   const [headerProps, setHeaderProps] = useState<HeaderProps>(bodyItems.items[0].data.content[0].props);
//   const [bodyProps, setBodyProps] = useState<HeaderProps>(bodyItems.items[0].data.content[1].props);

//   const Tab = useSelector((state: RootState) => state?.sample.pushTab);
//   const [selectedTab, setSelectedTab] = React.useState<any>("components");
//   const [getID, setGetID] = useState();
//   const [eleKey, setEleKey] = useState<any>();
//   const [headerItems, setHeaderItems] = useState({});
//   const [showEdit, setShowEdit] = useState("");
//   const [mode, setMode] = useState<string>("");
//   const [openMode, setOpenMode] = useState(false);

//   const [isLoading, setIsLoading] = useState(true);
//   const dispatch = useDispatch();
//   const [footerItems, setFooterItems] = useState({});
//   useEffect(() => {
//     setHeaderItems(data);
//     setFooterItems(dataFooter);
//     setIsLoading(true);
//     getElementsKeyService().then((res) => {
//       if (res.data) {
//         setEleKey(res.data);
//       }
//       setIsLoading(false);
//     });
//   }, []);

//   useEffect(() => {
//     if (Tab === "attributies") setSelectedTab("attributies");
//   }, [Tab]);

//   const handleSetElementProperties = (mode: string) => {
//     dispatch(pushTab("attributies"));
//     setMode(mode);
//   };

//   const SkeletonLoad = ({ num }: { num: number }) => {
//     return (
//       <div className="w-full flex flex-col gap-2 mt-4">
//         {Array.from(Array(num).keys()).map((i, k) => (
//           <Skeleton key={k} className="h-3 mb-2 w-[90%] mx-auto rounded-lg" />
//         ))}
//       </div>
//     );
//   };

//   const [template, setTemplate] = useState(
//     {
//       "creatorId": "2TUqaBtHJHOB3jifX",
//       "organizationId": "2TUqaBtHJHOB3jifX",
//       "templateName": "",
//       "templateThumbnail": "https://inv-api.kosign.dev/api/files/15cfda28-d09f-4b5e-9250-053638bb6c2c.jpg",
//       "header": {
//         "property": {},
//         "content": {}
//       },
//       "body": {
//         "property": {},
//         "content": {}
//       },
//       "footer": {
//         "property": {},
//         "content": {}
//       }
//     }
//   );
//   const clickOpenPreview = () => {
//     setOpenMode(true);

//     setTemplate((prevTemplate) => ({
//       ...prevTemplate,
//       header: {
//         ...prevTemplate.header,
//         content: headerItems,
//       },
//       body: {
//         ...prevTemplate.body,
//         content: bodyItems,
//       },
//       footer: {
//         ...prevTemplate.footer,
//         content: footerItems,
//       },
//     }));
//   };

//   return (
//     <div className="h-full w-full flex">
//       {/* <div className='flex gap-3'>
//                 <Button size='sm'>Header</Button>
//                 <Button size='sm'>Paragraph</Button>
//                 <Button size='sm'>Bold</Button>
//             </div> */}
//       <DndProvider backend={HTML5Backend}>
//         <div className="flex justify-between w-full h-full">
//           <div className="border rounded-lg w-[90%] overflow-y-scroll">
//             <GridHeader
//               setShowEdit={setShowEdit}
//               setSelectedTab={setSelectedTab}
//               selectedTab={selectedTab}
//               getID={getID}
//               setGetID={setGetID}
//               headerItems={headerItems}
//               setHeaderItems={setHeaderItems}
//             />
//             {/* <DragCompo headerItems={headerItems} setHeaderItems={setHeaderItems} /> */}
//             <GridBody
//               mode={mode}
//               setMode={setMode}
//               setBodyItems={setBodyItems}
//               bodyItems={bodyItems}
//               headerProps={headerProps}
//               bodyProps={bodyProps}
//               handleSetElementProperties={handleSetElementProperties}
//             />
//             <GridFooter
//               setShowEdit={setShowEdit}
//               setSelectedTab={setSelectedTab}
//               selectedTab={selectedTab}
//               getID={getID}
//               setGetID={setGetID}
//               footerItems={footerItems}
//               setFooterItems={setFooterItems}
//             />
//           </div>
//           <div className="ml-3 h-full pb-6 w-[20%]">
//             <ComponentTab
//               setSelectedTab={setSelectedTab}
//               selectedTab={selectedTab}
//             />

//             <section className="overflow-y-scroll mt-2 h-[88%]">
//               {selectedTab === "components" ? (
//                 <ElementsComponent
//                   headerItems={headerItems}
//                   setHeaderItems={setHeaderItems}
//                   footerItems={footerItems}
//                   setFooterItems={setFooterItems}
//                 />
//               ) : selectedTab === "elementskey" ? (
//                 isLoading ? (
//                   <SkeletonLoad num={10} />
//                 ) : (
//                   <ElementsKeyComponent eleKey={eleKey} />
//                 )
//               ) : mode === "Table_Head" ? (
//                 <>
//                   <AttributesComponent
//                     printProperties={headerProps}
//                     setPrintProperties={setHeaderProps}
//                     mode={mode}
//                   />
//                   {/* <DesignComponent
//                     getID={getID}
//                     headerItems={headerItems}
//                     setHeaderItems={setHeaderItems}
//                     footerItems={footerItems}
//                     setFooterItems={setFooterItems}
//                   /> */}
//                 </>
//               ) : mode === "Table_Body" ? (
//                 <>
//                   <AttributesComponent
//                     printProperties={bodyProps}
//                     setPrintProperties={setBodyProps}
//                     mode={mode}
//                   />
//                 </>
//               ) : (
//                 <>
//                   {showEdit === "show" ? (
//                     <DesignComponent
//                       getID={getID}
//                       headerItems={headerItems}
//                       setHeaderItems={setHeaderItems}
//                       footerItems={footerItems}
//                       setFooterItems={setFooterItems}
//                     />
//                   ) : (
//                     <>
//                       <div className="flex justify-center flex-col items-center text-sm text-foreground-400 mt-6">
//                         <MouseSquare size="32" className="mb-2" />
//                         <span>Please select items</span>
//                       </div>
//                     </>
//                   )}
//                 </>
//               )}
//             </section>
//             <div className=" fixed bg-white z-90 bottom-4 w-[260px] rounded-lg ">
//               <Button
//                 onClick={() => {
//                   clickOpenPreview();
//                 }}
//                 variant="flat"
//                 className="z-90 rounded-lg w-full"
//               >
//                 Preview
//               </Button>
//             </div>
//             <PreviewInvoice
//               headerItems={headerItems}
//               setHeaderItems={setHeaderItems}
//               bodyProps={bodyItems}
//               setBodyProps={setBodyProps}
//               footerItems={footerItems}
//               setFooterItems={setFooterItems}
//               openMode={openMode}
//               setOpenMode={setOpenMode}
//               template={template}
//               setTemplate={setTemplate}
//             />
//           </div>
//         </div>
//       </DndProvider>
//     </div>
//   );
// };
const Page =()=>{
  redirect('/template')
}

export default Page;