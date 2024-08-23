import React, { useEffect, useState } from 'react'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Popover, PopoverContent, PopoverTrigger, useDisclosure } from "@nextui-org/react";
import { getInvoiceTypelsService } from '@/app/service/Templates.service';
import { ArrowDown2 } from 'iconsax-react';

const SaveInvoiceTemplateComponent = ({ handleSaveInvoiceTemplate }: any) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [selectedKeys, setSelectedKeys] = React.useState<any>(new Set(["STANDARD"]));
    const selectedValue = React.useMemo(
        () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
        [selectedKeys]

    );

    const [selectedTimeKeys, setSelectedTimeKeys] = React.useState<any>(new Set(["WEEK"]));
    const selectedTimeValue = React.useMemo(
        () => Array.from(selectedTimeKeys).join(", ").replaceAll("_", " "),
        [selectedTimeKeys]

    );


    const [invName, setInvName] = useState<any>({
        "templateName": "Untitle"
    });
    const [typeInvoice, setTypeInvoice] = useState([]);
    const [timels, setTimels] = useState([]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setInvName((prev: any) => ({ ...prev, [name]: `${value}` }));

        console.log(invName);
    }

    useEffect(() => {
        handleGetTypeInvoicels()
        handleGetTimels()
    }, [])
    const handleGetTypeInvoicels = () => {
        getInvoiceTypelsService("types").then((response) => {
            setTypeInvoice(response.data)
        })
    }
    const handleGetTimels = () => {
        getInvoiceTypelsService("times").then((response) => {
            setTimels(response.data)
        })
    }
    return (
        <>
            <Button color="primary"
                size="sm"
                onPress={onOpen}>Save Invoice</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center">
                                <h2 className="text-xl font-semibold text-foreground">Invoice Template</h2>
                                <p className="text-sm text-foreground-400">Customize your invoice template settings</p>
                            </ModalHeader>

                            <ModalBody className="px-4 py-2">
                                <div className="text-small">
                                    <div className='w-full flex items-center gap-4'>
                                        <Input
                                            size='sm'
                                            isRequired
                                            type="text"
                                            onChange={handleChange}
                                            name='templateName'
                                            label="Template name"
                                            defaultValue="Untitle"
                                            className="w-full mb-4"
                                        />
                                    </div>
                                    <div className='w-full flex items-center gap-4'>
                                        <p className='text-foreground-400 mb-2 w-[200px]'>Select Template type</p>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button size='sm' className="normal-case bg-primary text-white">
                                                    {selectedValue || 'Select Invoice Type'}
                                                    <ArrowDown2 size={16} />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Single selection example"
                                                variant="flat"
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={selectedKeys}
                                                onSelectionChange={setSelectedKeys}
                                            >
                                                {
                                                    typeInvoice
                                                        .filter((item) => item !== "ALL")
                                                        .map((item) => (
                                                            <DropdownItem key={item}>{item}</DropdownItem>
                                                        ))
                                                }
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                    <div className='w-full flex items-center gap-4 mt-3'>
                                        <p className='text-foreground-400 w-[200px] mb-2'>Select Expired Time</p>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button size='sm' className="normal-case bg-primary text-white">
                                                    {selectedTimeValue || 'Select Time Period'}
                                                    <ArrowDown2 size={16} />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu
                                                aria-label="Single selection example"
                                                variant="flat"
                                                disallowEmptySelection
                                                selectionMode="single"
                                                selectedKeys={selectedTimeKeys}
                                                onSelectionChange={setSelectedTimeKeys}
                                            >
                                                {
                                                    timels
                                                        .filter((item) => item !== "ALL")
                                                        .map((item) => (
                                                            <DropdownItem key={item}>{item}</DropdownItem>
                                                        ))
                                                }
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </ModalBody>

                            <ModalFooter className="flex justify-end gap-2">
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={() => handleSaveInvoiceTemplate(selectedValue, selectedTimeValue, invName?.templateName)}>
                                    Submit
                                </Button>
                            </ModalFooter>
                        </>

                    )}
                </ModalContent>
            </Modal>
        </>

    )
}

export default SaveInvoiceTemplateComponent