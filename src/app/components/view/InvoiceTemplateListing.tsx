"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Select,
  SelectItem,
  Tooltip,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { SelectorIcon } from "./icons/SelectorIcon";
import {
  getTemplatePreview,
  getTemplateType,
} from "@/app/service/Templates.service";
import { Add, Book1, InfoCircle } from "iconsax-react";
import ApiDocs from "./docs/ApiDocs";
import Image from "next/image";
import { useRouter } from "next/navigation";

const InvoiceTemplateListing = () => {
  const CREATOR_ID = process.env.ADM_CREATOR_ID;
  const ORG_ID = process.env.ADM_ORG_ID;

  const [searchQuery, setSearchQuery] = useState<any>("");
  const [filteredTemplates, setFilteredTemplates] = useState<any>(null);
  const [templateType, setTemplateType] = useState<any>([]);
  const [selectType, setSelectType] = useState<any>("ALL");
  const [templateList, setTemplateList] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [selectTemplate, setSelectTemplate] = useState<any>({});
  const router = useRouter();

  useEffect(() => {
    const fetchTemplateTypes = async () => {
      const template_types = await getTemplateType();
      if (template_types) {
        setTemplateType(template_types.data);
      }
    };
    fetchTemplateTypes();
  }, []);

  useEffect(() => {
    const fetchTemplateList = async () => {
      const template_lists = await getTemplatePreview(
        CREATOR_ID,
        ORG_ID,
        selectType
      );
      if (template_lists) {
        setLoading(false);
        setTemplateList(template_lists.data);
      }
    };
    fetchTemplateList();
  }, [selectType]);

  useEffect(() => {
    const filtered = templateList.filter((item: any) =>
      item.templateName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTemplates(filtered);
  }, [searchQuery, templateList]);

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleType = async (value: any) => {
    setLoading(true);
    setSelectType(value?.currentKey);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleOpen = (id: any) => {
    setSelectTemplate((prevLoad: any) => ({ ...prevLoad, [id]: true }));
  };

  const handleClose = () => {
    setSelectTemplate((prev: any) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key] = false;
      });
      return newState;
    });
  };

  const handleCreateNew = () => {
    router.push(`/design/${"create"}`);
  };
  const handleUpdate = () => {
    router.push(`/design/${"update"}`);
  };

  return (
    // Layout
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col space-y-8">
        {/* Row 1 - Block 1 aligned to start */}
        <div className="flex justify-start w-full">
          <div className="flex flex-col justify-center items-start gap-1">
            <h1 className="text-2xl font-bold">Preview Default Templates</h1>
            <h3 className="text-sm">
              Customize and view your invoice template dynamically to match your
              specific needs. Choose a template type and see how it looks with
              your data.
            </h3>
          </div>
        </div>

        {/* Row 2 - Block 2 aligned to end */}
        <div className="flex justify-end w-full">
          <div className="flex gap-4 items-end">

            <Select
              label="Type"
              variant="faded"
              placeholder="Select a template"
              labelPlacement="outside"
              className="w-[350px]"
              size="md"
              disallowEmptySelection
              selectedKeys={[`${selectType}`]}
              onSelectionChange={handleType}
              selectorIcon={<SelectorIcon />}
            >
              {templateType?.map((template: any) => (
                <SelectItem key={template}>{template}</SelectItem>
              ))}
            </Select>

            <Input
              size="md"
              variant="faded"
              labelPlacement="outside"
              isClearable
              label="Invoice"
              placeholder="Invoice's name"
              className="w-[350px]"
              value={searchQuery}
              onClear={handleClear}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>
      {/* Cards */}
      <div >
        {loading ? (
          <div className="py-6 w-full gap-3 grid grid-cols-2 sm:grid-cols-7">
            <div >
              <Card className="shadow-none bg-none border w-full h-[280px] animate-pulse">
                <CardBody className="overflow-visible p-0">
                  <div className="w-full h-[230px] bg-gray-200"></div>
                </CardBody>
                <CardFooter className="text-sm justify-between">
                  <div className="rounded-md w-3/4 h-4 bg-gray-200"></div>
                </CardFooter>
              </Card>
            </div>
            {Array.from({ length: 6 }).map((_, index) => (
              <Card
                className="shadow-none bg-none border w-full h-[280px] animate-pulse"
                key={index}
              >
                <CardBody className="overflow-visible p-0">
                  <div className="w-full h-[230px] bg-gray-200"></div>
                </CardBody>
                <CardFooter className="text-sm justify-between">
                  <div className="rounded-md w-3/4 h-4 bg-gray-200"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredTemplates && filteredTemplates.length > 0 ? (
          <div className="py-6 w-full gap-3 grid grid-cols-2 sm:grid-cols-7">
            <div >
              <Button
                className="w-[200px] border h-[280px] p-0 m-0"
                onClick={handleCreateNew}
              >
                <Card className="cursor-pointer rounded-none w-full h-full shadow-none bg-none flex justify-center items-center p-0">
                  <CardBody className=" flex justify-center gap-4 items-center h-full w-full">
                    <Add size="44" color="#A1A1AA" />
                    <b>Add New</b>
                  </CardBody>
                </Card>
              </Button>
            </div>
            {filteredTemplates.map((item: any, index: any) => (
              <Button key={index}
                className="w-[200px] border h-[280px] p-0 m-0"
              >
                <Card
                  className="cursor-pointer shadow-none bg-none rounded-none w-full h-full p-0 "
                  
                >
                  <CardBody
                  onClick={handleUpdate}
                  className="overflow-visible p-0 ">
                    <Image
                      width={500}
                      height={500}
                      alt={item.id}
                      className="w-full px-4 pt-4 object-cover h-[230px]"
                      src={
                        item?.templateThumbnail ||
                        `https://i.pinimg.com/564x/02/e7/49/02e749ac2486c8c3fbe901d0a1fbf16a.jpg`
                      }
                    />
                  </CardBody>
                  <CardFooter className="cursor-default text-sm justify-between">
                    <b>
                      {item?.templateName?.length > 22
                        ? item.templateName.slice(0, 20) + "..."
                        : item.templateName}
                    </b>

                    <Tooltip  content="API Docs">
                      <Book1
                        className="cursor-pointer"
                        onClick={() => handleOpen(item.id)}
                        size={16}
                        color="#808080"
                      />
                    </Tooltip>

                    <ApiDocs
                      isOpen={selectTemplate[item.id]}
                      onOpenChange={handleClose}
                      data={item}
                    />
                  </CardFooter>
                </Card>
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-[280px]">
            <p className="text-gray-500">No templates available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceTemplateListing;
