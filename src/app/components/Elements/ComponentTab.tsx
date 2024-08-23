import { pushTab } from "@/app/redux/sampleSlice";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { CloudFog, GalleryAdd } from "iconsax-react";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PreviewInvoice from "../Modal/PreviewInvoice";

const ComponentTab = ({
  setSelectedTab,
  selectedTab,

}: any) => {
  const dispatch = useDispatch();
  const handleChangeTab = (value: any) => {
    setSelectedTab(value);
    dispatch(pushTab(value));
  };


  return (
    <div>
      <div className="flex z-10 justify-center h-[4%]">
        <Tabs
          selectedKey={selectedTab}
          size={"sm"}
          onSelectionChange={handleChangeTab}
          aria-label="Tabs Element and Design"
        >
          <Tab key="components" title="Components" />
          <Tab key="attributies" title="Attributies" />
          <Tab key="elementskey" title="Key Data" />
        </Tabs>
      </div>

    </div>
  );
};

export default ComponentTab;
