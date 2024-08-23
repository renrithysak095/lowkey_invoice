'use client';

import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Snippet } from "@nextui-org/react";
import { getTemplateDocs } from "@/app/service/Templates.service";
import { Book1, DocumentCode2, DocumentCopy, Key } from "iconsax-react";
import { formatDistanceToNow, parseISO } from 'date-fns';
import JsonEditor from "../json/JsonEditor";

const ApiDocs = ({ isOpen, onOpenChange, data }:{ isOpen:any, onOpenChange:any, data:any }) => {

  const [docs, setDocs] = useState<any>({});

  const formatExpirationDate = (dateString:any) => {
    if (!dateString) return 'N/A';
    const date = parseISO(dateString);
    const timeRemaining = formatDistanceToNow(date, { addSuffix: true });
    return timeRemaining.replace('about ', '');
  };

  useEffect(() => {
    const fetchTemplateDocs = async () => {
      const result = await getTemplateDocs(data?.id);
      if (result) {
        setDocs(result.data)
      }
    };
    fetchTemplateDocs();
  }, [data?.id]);

  return (
    <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex items-center gap-3">
              <Book1 size={20} color="#0F0F0F" />
              {`Template Docs`}
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm font-semibold">{`Template's ID:`}</span>
                  <span className="text-gray-600 text-sm">
                  <Snippet
                      tooltipProps={{
                        color: "default",
                        content: "Copy",
                        disableAnimation: true,
                        placement: "top",
                        closeDelay: 0,
                      }}
                      copyIcon={<DocumentCopy size="16" color="#4b5563" />}
                      symbol=""
                      className="p-0 text-gray-600 text-sm bg-white"
                    >
                      {docs?.id}
                    </Snippet>
                    </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm font-semibold">
                    {`Template's Name:`}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {docs?.templateName?.length > 30
                      ? docs?.templateName?.slice(0, 30) + "..."
                      : docs?.templateName}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm font-semibold">{`Creator's ID:`}</span>
                  <span className="text-gray-600 text-sm">
                    {docs?.creatorId}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-sm font-semibold">
                    {`Organization's ID:`}
                  </span>
                  <span className="text-gray-600 text-sm">
                    {docs?.organizationId}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b pb-1">
                  <span className="text-sm font-semibold">{`API Key:`}</span>
                  <span className="text-gray-600 text-sm">
                    <Snippet
                      tooltipProps={{
                        color: "default",
                        content: "Copy",
                        disableAnimation: true,
                        placement: "top",
                        closeDelay: 0,
                      }}
                      copyIcon={<DocumentCopy size="16" color="#4b5563" />}
                      symbol=""
                      className="p-0 text-gray-600 text-sm bg-white"
                    >
                      {docs?.apiKey}
                    </Snippet>
                  </span>
                </div>

                <div className="border-b pb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">{`JSON Key Input:`}</span>
                    <span className=" text-gray-600 text-sm">
                      {docs?.parameters ? "" : " N/A"}
                    </span>
                  </div>
                  <div className="mt-2">
                    {docs?.parameters ? (
                      <div className="flex flex-col relative">
                        <JsonEditor json={docs?.parameters} />
                        {/* Snippet button */}
                        <div className="absolute right-0 bottom-0">
                          <Snippet
                            tooltipProps={{
                              color: "default",
                              content: "Copy",
                              disableAnimation: true,
                              placement: "top",
                              closeDelay: 0,
                            }}
                            copyIcon={
                              <DocumentCode2 size="18" color="#FFFFFF" />
                            }
                            symbol=""
                            className="p-0 text-white text-sm bg-transparent mb-3 mr-3"
                          >
                            <span style={{ display: "none" }}>
                              {JSON.stringify(docs?.parameters, null, 2) ||
                                "No parameters available"}
                            </span>
                          </Snippet>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">
                    {`API Key Expired:`}
                  </span>
                  <span className="text-red-600 text-sm">
                    {formatExpirationDate(docs?.expiredDate)}
                  </span>
                </div>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ApiDocs;
