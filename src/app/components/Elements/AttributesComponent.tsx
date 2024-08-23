import { setAttributeBlock } from '@/app/redux/propertiesSlice'
import { RootState } from '@/app/redux/store/store'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { ArrowDown2, Blend, Check, Grid2, Grid4, MouseSquare, Pharagraphspacing, Text, TextalignCenter, TextalignJustifycenter, TextalignLeft, TextalignRight, TickSquare } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ColorPicker from 'react-pick-color';


const AttributesComponent = ({ printProperties, setPrintProperties, mode }:
    { printProperties: HeaderProps, setPrintProperties: any, mode: string }) => {
    const dispatch = useDispatch();
    // console.log("border >>>>>>>>", printProperties);

    const [backgroundColor, setBackgroundColor] = useState(printProperties?.backgroundColor);
    const [color, setColor] = useState(printProperties?.color);

    const [selectedBorderkeys, setSelectedBorderKeys] = React.useState<any>(new Set([printProperties?.border]));
    const selectedBorderValue = React.useMemo(
        () => Array.from(selectedBorderkeys).join(" "),
        [selectedBorderkeys]
    );

    const [selectedFontSizeKeys, setSelectedFontSizeKeys] = React.useState<any>(new Set([printProperties?.fontSize]));
    const selectedFontSizeValue = React.useMemo(
        () => Array.from(selectedFontSizeKeys).join(", "),
        [selectedFontSizeKeys]
    );

    const [selectedFontStyleKeys, setSelectedFontStyleKeys] = React.useState<any>(new Set([printProperties?.fontFamily]));
    const selectedFontStyleValue = React.useMemo(
        () => Array.from(selectedFontStyleKeys).join(", "),
        [selectedFontStyleKeys]
    );

    const [selectedTextTransformKeys, setSelectedTextTransformKeys] = React.useState<any>(new Set([printProperties?.textTransform]));
    const selectedTextTransformValue = React.useMemo(
        () => Array.from(selectedTextTransformKeys).join(", "),
        [selectedTextTransformKeys]
    );

    const [selectedAlignKeys, setSelectedAlignKeys] = React.useState<any>(new Set([printProperties?.textAlign]));
    const selectedAlignValue = React.useMemo(
        () => Array.from(selectedAlignKeys).join(", "),
        [selectedAlignKeys]
    );

    const [selectedLineHeightKeys, setSelectedLineHeightKeys] = React.useState<any>(new Set([printProperties?.lineHeight]));
    const selectedLineHeightValues = React.useMemo(
        () => Array.from(selectedLineHeightKeys).join(", "),
        [selectedLineHeightKeys]
    );

    const [selectedPaddingKeys, setSelectedPaddingKeys] = React.useState<any>(new Set([printProperties?.padding]));
    const selectedPaddingValue = React.useMemo(
        () => Array.from(selectedPaddingKeys).join(", "),
        [selectedPaddingKeys]
    );

    //set value on BodyItems change
    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            backgroundColor: backgroundColor
        }));
    }, [backgroundColor]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            color: color
        }));
    }, [color]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            border: selectedBorderValue,
        }));
    }, [selectedBorderValue]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            fontSize: selectedFontSizeValue,
        }));
    }, [selectedFontSizeValue]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            fontFamily: selectedFontStyleValue,
        }));
    }, [selectedFontStyleValue]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            textTransform: selectedTextTransformValue,
        }));
    }, [selectedTextTransformValue]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            textAlign: selectedAlignValue,
        }));
    }, [selectedAlignValue]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            lineHeight: selectedLineHeightValues,
        }));
    }, [selectedLineHeightValues]);

    useEffect(() => {
        setPrintProperties((prev: any) => ({
            ...prev,
            padding: selectedPaddingValue,
        }));
    }, [selectedPaddingValue]);


    //value change
    const handlePropChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
        const { name, value } = e.target;
        setPrintProperties((prev: any) => ({ ...prev, [name]: `${value}` }));
    };

    const handleMenuClick = (value: any, modeMenu: string) => {
        dispatch(setAttributeBlock("clicked"))
        if (modeMenu === "BORDER") {
            let isBorder = ''
            value == '' ? isBorder = 'border' : isBorder = ''
            setPrintProperties((prev: any) => ({ ...prev, border: isBorder }));
        }
        else if (modeMenu === "FONTWEIGHT") {
            let isBold = ''
            value != 'font-bold' ? isBold = 'font-bold' : isBold = 'font-normal'
            setPrintProperties((prev: any) => ({ ...prev, fontWeight: isBold }));
        }
    }

    const displayAlignIcon = () => {
        switch (printProperties?.textAlign) {
            case "text-center":
                return <TextalignCenter size={12} />;
            case "text-left":
                return <TextalignLeft size={16} />;
            case "text-right":
                return <TextalignRight size={16} />;
            case "text-justify":
                return <TextalignJustifycenter size={12} />;
            default:
                return null;
        }
    };
    function convertPaddingName(name: string) {
        const parts = name.split('-');
        const firstPart = "Padding";
        const secondPart = parts[1].padStart(2, '0');
        return `${firstPart}-${secondPart}`;
    }


    const handleClickOnAttributeBlock = () => {
        dispatch(setAttributeBlock("clicked"))
    }

    return (
        <div onClick={handleClickOnAttributeBlock}>
            <div className="mt-4 font-poppins">
                <p className="text-tiny mb-3 text-foreground-400">Borders Style</p>
                <Dropdown showArrow placement='bottom'>
                    <DropdownTrigger>
                        <div onClick={handleClickOnAttributeBlock} className='flex items-center justify-between text-foreground-600 cursor-pointer w-[110px] border rounded-md py-1 px-2'>
                            <span className='text-tiny'>
                                Border
                            </span>
                            <ArrowDown2 size={10} />
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu
                        closeOnSelect={false}
                        aria-label="multiple selection BorderStyle"
                        variant="flat"
                        selectionMode="multiple"
                        selectedKeys={selectedBorderkeys}
                        onSelectionChange={setSelectedBorderKeys}
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
            </div>

            <div className="mt-5 font-poppins">
                <p className="text-tiny mb-3 text-foreground-400">Background</p>
                <div className='flex gap-3'>
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <div onClick={handleClickOnAttributeBlock} className='flex items-center justify-between text-foreground-600 cursor-pointer w-[120px] border rounded-md py-1 px-2'>
                                <span className='text-tiny flex items-center'>
                                    <Blend
                                        size={16}
                                        className='mr-1.5 border rounded-md'
                                        variant={printProperties?.backgroundColor ? "Bold" : "Linear"}
                                        color={printProperties?.backgroundColor ? printProperties?.backgroundColor : "#000"} />
                                    Colors
                                </span>
                                <ArrowDown2 size={10} />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="py-1">
                                <ColorPicker color={printProperties?.backgroundColor} onChange={color => setBackgroundColor(color.hex)} theme={{
                                    boxShadow: 'none'
                                }} />
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Dropdown size='sm' showArrow placement='bottom'>
                        <DropdownTrigger>
                            <div onClick={handleClickOnAttributeBlock} className='flex items-center justify-between text-foreground-600 cursor-pointer w-[120px] border rounded-md py-1 px-2'>
                                <span className='text-tiny'>
                                    {printProperties?.padding ? convertPaddingName(printProperties?.padding) : "Padding"}
                                </span>
                                <ArrowDown2 size={10} />
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
                </div>
            </div>

            <div className="mt-5 font-poppins">
                <p className="text-tiny mb-3 text-foreground-400">Typography</p>
                <div className='flex gap-3'>
                    <Dropdown showArrow placement='bottom'>
                        <DropdownTrigger>
                            <div onClick={handleClickOnAttributeBlock} className='flex items-center justify-between text-foreground-600 cursor-pointer w-[140px] border rounded-md py-1 px-2'>
                                <span className={`${selectedFontStyleValue} flex text-tiny capitalize line-clamp-1`}>
                                    <Text size={14} className='mr-2' />
                                    {printProperties?.fontFamily ? printProperties?.fontFamily : "Font Style"}
                                </span>
                                <ArrowDown2 size={10} />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection fontStyle"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedFontStyleKeys}
                            onSelectionChange={setSelectedFontStyleKeys}
                        >
                            <DropdownItem className='font-siemreap' key="font-siemreap">Font-Siemreap | សៀមរាប</DropdownItem>
                            <DropdownItem className='font-poppins' key="font-poppins">Font-Poppins</DropdownItem>
                            <DropdownItem className='font-satoshi' key="font-satoshi">Font-Satoshi</DropdownItem>
                            <DropdownItem className='font-sans' key="font-sans">Font-Sans</DropdownItem>
                            <DropdownItem className='font-mono' key="font-mono">Font-Mono</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <Dropdown showArrow placement='bottom'>
                        <DropdownTrigger>
                            <div onClick={handleClickOnAttributeBlock} className='flex items-center justify-between text-foreground-600 cursor-pointer w-[110px] border rounded-md py-1 px-2'>
                                <span className='text-tiny capitalize'>
                                    {printProperties?.fontSize ? printProperties?.fontSize : "Font Size"}
                                </span>
                                <ArrowDown2 size={10} />
                            </div>
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
                </div>
                <div className='flex gap-3 mt-3'>
                    <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <div onClick={handleClickOnAttributeBlock} className='flex items-center justify-between text-foreground-600 cursor-pointer w-[140px] border rounded-md py-1 px-2'>
                                <span className='text-tiny flex items-center'>
                                    <Blend
                                        size={16}
                                        className='mr-1.5 border rounded-md'
                                        variant={printProperties?.color ? "Bold" : "Linear"}
                                        color={printProperties?.color ? printProperties?.color : "#000"} />
                                    Text Colors
                                </span>
                                <ArrowDown2 size={10} />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="py-1">
                                <ColorPicker color={printProperties?.color} onChange={color => setColor(color.hex)} theme={{
                                    boxShadow: 'none'
                                }} />
                            </div>
                        </PopoverContent>
                    </Popover>

                    <Dropdown size='sm' showArrow placement='bottom'>
                        <DropdownTrigger>
                            <div onClick={handleClickOnAttributeBlock} className='flex items-center text-foreground-600 cursor-pointer w-[110px] border rounded-md py-1 px-2'>
                                {displayAlignIcon()}
                                <span className='text-tiny capitalize ml-2'>
                                    {printProperties?.textAlign ? printProperties?.textAlign : "Text Align"}
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
                            <DropdownItem key="text-left" textValue='left'>
                                <span className='flex items-center'>
                                    <TextalignLeft size={24} className='border rounded-md p-0.5 mr-2' /> Left
                                </span>
                            </DropdownItem>
                            <DropdownItem key="text-center" textValue='center'>
                                <span className='flex items-center'>
                                    <TextalignCenter size={24} className='border rounded-md p-0.5 mr-2' /> Center
                                </span>
                            </DropdownItem>
                            <DropdownItem key="text-right" textValue='right'>
                                <span className='flex items-center'>
                                    <TextalignRight size={24} className='border rounded-md p-0.5 mr-2' /> Right
                                </span>
                            </DropdownItem>
                            <DropdownItem key="text-justify" textValue='justify'>
                                <span className='flex items-center'>
                                    <TextalignJustifycenter size={24} className='border rounded-md p-0.5 mr-2' /> Justify
                                </span>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>

            <div className="mt-5 font-poppins">
                <p className="text-tiny mb-3 text-foreground-400">Text Transform</p>
                <div className='flex gap-3'>
                    <Dropdown showArrow placement='bottom'>
                        <DropdownTrigger>
                            <div onClick={handleClickOnAttributeBlock} className='flex items-center justify-between text-foreground-600 cursor-pointer w-[140px] border rounded-md py-1 px-2'>
                                <span className={`${selectedTextTransformValue} text-tiny capitalize line-clamp-1`}>
                                    {printProperties?.textTransform ? printProperties?.textTransform : "Normal"}
                                </span>
                                <ArrowDown2 size={10} />
                            </div>
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Single selection fontStyle"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedTextTransformKeys}
                            onSelectionChange={setSelectedTextTransformKeys}
                        >
                            <DropdownItem className='none' key="none">none</DropdownItem>
                            <DropdownItem className='uppercase' key="uppercase">uppercase</DropdownItem>
                            <DropdownItem className='lowercase' key="lowercase">lowercase</DropdownItem>
                            <DropdownItem className='capitalize' key="capitalize">capitalize</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                    <div className='flex items-center selection:select-none justify-between text-foreground-600 cursor-pointer w-[80px] border rounded-md py-1 px-2'
                        onClick={() => handleMenuClick(printProperties?.fontWeight, "FONTWEIGHT")}>
                        <span className={`${printProperties?.fontWeight} text-tiny`}>
                            Bold
                        </span>
                        {
                            printProperties?.fontWeight === "font-bold" &&
                            <span><TickSquare size={16} /></span>
                        }
                    </div>
                </div>
            </div>
            <div className="mt-5 font-poppins">
                <p className="text-tiny mb-3 text-foreground-400">Line Height</p>
                <Dropdown size='md' showArrow placement='bottom'>
                    <DropdownTrigger>
                        <div onClick={handleClickOnAttributeBlock} className='flex items-center text-foreground-600 cursor-pointer w-[145px] border rounded-md py-1 px-2'>
                            <span><Pharagraphspacing className='mr-2' size={16} /></span>
                            <span className={`text-tiny`}>
                                {selectedLineHeightValues}
                            </span>
                        </div>
                    </DropdownTrigger>
                    <DropdownMenu
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedLineHeightKeys}
                        onSelectionChange={setSelectedLineHeightKeys}
                        closeOnSelect={false}
                        aria-label="LineHeight Actions"
                        className='min-w-[220px]'
                    >
                        <DropdownItem key="leading-none" textValue='none'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-none</span>
                                <span className='text-foreground-400 text-tiny'>1</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem key="leading-tight" textValue='tight'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-tight</span>
                                <span className='text-foreground-400 text-tiny'>1.25</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem key="leading-snug" textValue='snug'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-snug</span>
                                <span className='text-foreground-400 text-tiny'>1.375</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem key="leading-normal" textValue='normal'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-normal</span>
                                <span className='text-foreground-400 text-tiny'>1.5</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem key="leading-relaxed" textValue='relaxed'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-relaxed</span>
                                <span className='text-foreground-400 text-tiny'>1.625</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem showDivider key="leading-loose" textValue='loose'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-loose</span>
                                <span className='text-foreground-400 text-tiny'>2</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem key="leading-8" textValue='8'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-8</span>
                                <span className='text-foreground-400 text-tiny'>32px</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem key="leading-9" textValue='9'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-9</span>
                                <span className='text-foreground-400 text-tiny'>36px</span>
                            </span>
                        </DropdownItem>
                        <DropdownItem key="leading-10" textValue='10'>
                            <span className='capitalize flex justify-between'>
                                <span>leading-10</span>
                                <span className='text-foreground-400 text-tiny'>40px</span>
                            </span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div >
    )
}

export default AttributesComponent