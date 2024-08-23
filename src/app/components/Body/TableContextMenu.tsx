import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, Input } from '@nextui-org/react'
import React, { useEffect } from 'react'
import {
    BucketSquare,
    Grid2, Grid4,
    Grid6, Maximize2, Text,
    TextalignCenter,
    TextalignJustifycenter,
    TextalignLeft,
    TextalignRight,
    TextBold, TickSquare
} from 'iconsax-react';
import { getStringAfterHyphen } from '@/app/utils/Helper';
import FontDownloadRoundedIcon from '@mui/icons-material/FontDownloadRounded';

function TableContextMenu({ mode, properties, setProperties, thItem, backgroundColor, children }:
    { mode: string, properties: HeaderProps, setProperties: any, thItem: TableContent, backgroundColor: string, children: any }) {

    const handlePropChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setProperties((prev: any) => ({ ...prev, [name]: `${value}` }));
    };

    const [selectedPaddingKeys, setSelectedPaddingKeys] = React.useState<any>(new Set([thItem.props.padding]));
    const selectedPaddingValue = React.useMemo(
        () => Array.from(selectedPaddingKeys).join(", "),
        [selectedPaddingKeys]
    );
    const [selectedAlignKeys, setSelectedAlignKeys] = React.useState<any>(new Set([getStringAfterHyphen(thItem.props.textAlign ? thItem.props.textAlign : "text-left")]));
    const selectedAlignValue = React.useMemo(
        () => Array.from(selectedAlignKeys).join(", "),
        [selectedAlignKeys]
    );

    const [selectedFontSizeKeys, setSelectedFontSizeKeys] = React.useState<any>(new Set([thItem.props.fontSize ? thItem.props.fontSize : "text-base"]));
    const selectedFontSizeValue = React.useMemo(
        () => Array.from(selectedFontSizeKeys).join(", "),
        [selectedFontSizeKeys]
    );
    const [selectedFontStyleKeys, setSelectedFontStyleKeys] = React.useState<any>(new Set([thItem.props.fontFamily ? thItem.props.fontFamily : "font-poppins"]));
    const selectedFontStyleValue = React.useMemo(
        () => Array.from(selectedFontStyleKeys).join(", "),
        [selectedFontStyleKeys]
    );

    const [selectedBorderkeys, setSelectedBorderKeys] = React.useState<any>(new Set([thItem.props.border]));
    const selectedBorderValue = React.useMemo(
        () => Array.from(selectedBorderkeys).join(" "),
        [selectedBorderkeys]
    );

    //set value on BodyItems change
    useEffect(() => {
        setProperties((prev: any) => ({ ...prev, fontSize: selectedFontSizeValue }));
        setProperties((prev: any) => ({ ...prev, fontFamily: selectedFontStyleValue }));
        setProperties((prev: any) => ({ ...prev, textAlign: "text-" + selectedAlignValue }));
        setProperties((prev: any) => ({ ...prev, padding: selectedPaddingValue }));
        setProperties((prev: any) => ({ ...prev, border: selectedBorderValue }));
    }, [selectedFontSizeValue, selectedAlignValue, selectedPaddingValue, selectedBorderValue, selectedFontStyleValue]);

    // console.log("properties", properties);
    //handle Menu click
    const handleMenuClick = (value: any, mode: string) => {
        if (mode === "BORDER") {
            let isBorder = ''
            value == '' ? isBorder = 'border' : isBorder = ''
            setProperties((prev: any) => ({ ...prev, border: isBorder }));
        }
        else if (mode === "FONTWEIGHT") {
            let isBold = ''
            value != 'font-bold' ? isBold = 'font-bold' : isBold = 'font-normal'
            setProperties((prev: any) => ({ ...prev, fontWeight: isBold }));
        }
    }

    return (
        <Dropdown showArrow placement='top'>
            <DropdownTrigger>
                {children}
            </DropdownTrigger>
            <DropdownMenu closeOnSelect={false} aria-label="context menu Actions" >
                <DropdownSection title={`${mode}`}>
                    <DropdownItem key={'border'} onClick={() => handleMenuClick(properties?.border, "BORDER")} textValue='true'>
                        <Dropdown showArrow placement='right' defaultOpen>
                            <DropdownTrigger>
                                <div className='flex items-center justify-between'>
                                    <span className='flex items-center'>
                                        <Grid6 size={24} variant='Bold' className='mr-2' />
                                        Border Style
                                    </span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                closeOnSelect={false}
                                aria-label="multiple selection BorderStyle"
                                variant="flat"
                                selectionMode="multiple"
                                selectedKeys={selectedBorderkeys} //work
                                onSelectionChange={setSelectedBorderKeys} //work
                            >
                                <DropdownItem
                                    startContent={<Grid2 size={18} variant='Bold' />}
                                    key="border-1">
                                    Border
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<Grid4 size={18} className="rotate-90" variant='Bold' />}
                                    key="border-t">
                                    Border Top
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<Grid4 size={18} className="-rotate-90" variant='Bold' />}
                                    key="border-b">
                                    Border Bottom
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<Grid4 size={18} className="-rotate-180" variant='Bold' />}
                                    key="border-r">
                                    Border Right
                                </DropdownItem>
                                <DropdownItem
                                    startContent={<Grid4 size={18} variant='Bold' />}
                                    key="border-l">
                                    Border Left
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownItem>
                    <DropdownItem key={'fontSize'} textValue='true'>
                        <Dropdown showArrow placement='right'>
                            <DropdownTrigger>
                                <span className='flex items-center capitalize'>
                                    <FontDownloadRoundedIcon className='mr-2 rounded-md' />
                                    {selectedFontSizeValue}
                                </span>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection fontSize"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedFontSizeKeys}
                                onSelectionChange={setSelectedFontSizeKeys}
                            >
                                <DropdownItem key="text-xs">Font-xs</DropdownItem>
                                <DropdownItem key="text-sm">Font-sm</DropdownItem>
                                <DropdownItem key="text-base">Font-base</DropdownItem>
                                <DropdownItem key="text-lg">Font-lg</DropdownItem>
                                <DropdownItem key="text-xl">Font-xl</DropdownItem>
                                <DropdownItem key="text-2xl">Font-2xl</DropdownItem>
                                <DropdownItem key="text-3xl">Font-3xl</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownItem>
                    <DropdownItem key={'fontStyle'} textValue='true'>
                        <Dropdown showArrow placement='right'>
                            <DropdownTrigger>
                                <span className='flex items-center capitalize'>
                                    <Text size={24} variant='Bold' className='mr-2' />
                                    {selectedFontStyleValue}
                                </span>
                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Single selection fontStyle"
                                variant="flat"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedFontStyleKeys} //work
                                onSelectionChange={setSelectedFontStyleKeys} //work
                            >
                                <DropdownItem className='font-siemreap' key="font-siemreap">Font-Siemreap | សៀមរាប</DropdownItem>
                                <DropdownItem className='font-poppins' key="font-poppins">Font-Poppins</DropdownItem>
                                <DropdownItem className='font-satoshi' key="font-satoshi">Font-Satoshi</DropdownItem>
                                <DropdownItem className='font-sans' key="font-sans">Font-Sans</DropdownItem>
                                <DropdownItem className='font-mono' key="font-mono">Font-Mono</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownItem>
                    <DropdownItem key={'fontWeight'} onClick={() => handleMenuClick(properties?.fontWeight, "FONTWEIGHT")} textValue='true'>
                        <div className='flex items-center justify-between'>
                            <span className='flex items-center'>
                                <TextBold size={24} variant='Bold' className='mr-2' />
                                Bold
                            </span>
                            {
                                properties?.fontWeight === "font-bold" &&
                                <span><TickSquare size={16} /></span>
                            }
                        </div>
                    </DropdownItem>
                    <DropdownItem key={'backgroundColor'} textValue='true'>
                        <Dropdown showArrow placement='right'>
                            <DropdownTrigger>
                                <div className='flex items-center justify-between'>
                                    <span className='flex items-center'>
                                        <BucketSquare size={24} variant='Bold' className='mr-2' />
                                        Backgrounds
                                    </span>
                                    <span className='h-4 w-4 rounded-md border' style={{ backgroundColor: backgroundColor ? backgroundColor : "transparent" }}></span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu closeOnSelect={false} aria-label="Static Actions">
                                <DropdownItem key="new" textValue='#fff'>
                                    <Input
                                        type='color'
                                        onChange={handlePropChange}
                                        name='backgroundColor' />
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownItem>
                    {/* <DropdownItem key={'borderColor'} textValue='true'>
                        <Dropdown showArrow placement='right'>
                            <DropdownTrigger>
                                <div className='flex items-center justify-between'>
                                    <span className='flex items-center'>
                                        <Bucket size={22} variant='Bold' className='mr-2' />
                                        Border Color
                                    </span>
                                    <span className='h-4 w-4 rounded-md border'
                                        style={{ backgroundColor: thItem.props.borderColor ? thItem.props.borderColor : "transparent" }}>
                                    </span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu closeOnSelect={false} aria-label="Static Actions">
                                <DropdownItem key="new" textValue='#fff'>
                                    <Input
                                        type='color'
                                        onChange={handlePropChange}
                                        name='borderColor' />
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownItem> */}
                    <DropdownItem key={'textAlign'} textValue='true'>
                        <Dropdown size='sm' showArrow placement='right'>
                            <DropdownTrigger>
                                <div className='flex items-center justify-between'>
                                    <span className='flex items-center'>
                                        <TextalignCenter size={21} variant='Bold' className='mr-2 ml-[0.4px] p-0.5 rounded-md text-white bg-black' />
                                        Text Align
                                    </span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedAlignKeys}
                                onSelectionChange={setSelectedAlignKeys}
                                closeOnSelect={false}
                                aria-label="textAlign Actions"
                            >
                                <DropdownItem key="left" textValue='left'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' /> Left
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="center" textValue='center'>
                                    <span className='flex items-center'>
                                        <TextalignCenter size={24} className='border rounded-md p-0.5 mr-2' /> Center
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="right" textValue='right'>
                                    <span className='flex items-center'>
                                        <TextalignRight size={24} className='border rounded-md p-0.5 mr-2' /> Right
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="justify" textValue='justify'>
                                    <span className='flex items-center'>
                                        <TextalignJustifycenter size={24} className='border rounded-md p-0.5 mr-2' /> Justify
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownItem>
                    <DropdownItem key={'padding'} textValue='true'>
                        <Dropdown size='sm' showArrow placement='right'>
                            <DropdownTrigger>
                                <div className='flex items-center justify-between'>
                                    <span className='flex items-center'>
                                        <Maximize2 size={24} variant='Bold' className='mr-2' />
                                        Padding
                                    </span>
                                </div>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedPaddingKeys}
                                onSelectionChange={setSelectedPaddingKeys}
                                closeOnSelect={false}
                                aria-label="Padding Actions"
                            >
                                <DropdownItem key="p-0" textValue='p-0'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 0
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="p-0.5" textValue='p-0.5'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 0.5
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="p-1" textValue='p-1'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 01
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="p-2" textValue='p-2'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 02
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="p-3" textValue='p-3'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 03
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="p-4" textValue='p-4'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 04
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="p-5" textValue='p-5'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 05
                                    </span>
                                </DropdownItem>
                                <DropdownItem key="p-6" textValue='p-6'>
                                    <span className='flex items-center'>
                                        <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' />
                                        Padding 06
                                    </span>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </DropdownItem>
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    )
}

export default TableContextMenu