import React, { useEffect, useRef, useState } from "react";

// type InputProps = {
//   length?: number;
//   onComplete: (pin: string) => void;
// };

const InsertVatNumber = ({itemKey,length, onComplete,tempValue}: {itemKey:any,length:any, onComplete:any,tempValue:any}) => {
  const [VATTIN, setVATTIN] = useState<string[]>(Array(tempValue.length).fill(""));
  const inputRef = useRef<HTMLInputElement[]>(Array(length).fill(null));

  // console.log(VATTIN)
  // console.log(tempValue)

  const handleTextChange = (input: string, index: number) => {
    if (input === " ") return;
    const newPin = [...VATTIN];
    
    newPin[index] = input;
    setVATTIN(newPin);

    if (input.length === 1 && index < newPin.length - 1) {
      inputRef.current[index + 1]?.focus();
    }

    if (input.length === 0 && index > 0) {
      inputRef.current[index - 1]?.focus();
    }

    if (input.length === 1 && index === newPin.length - 1  ) {

      setVATTIN([...newPin, ""]);
      inputRef.current = Array(newPin.length + 1).fill(null);
      setTimeout(() => {
        inputRef.current[newPin.length]?.focus();
      }, 0);
    }
    console.log(newPin)
    if (newPin.every((digit) => digit !== "" && digit.length === 1)) {
      onComplete(newPin.join(""),itemKey);
    }
  };

  useEffect(()=>{
    for (let i = 0; i < tempValue.length && i < VATTIN.length; i++) {
      VATTIN[i] = tempValue[i];
    }
  },[])

  return (
    <div className="flex gap-1 z-90">
      {VATTIN.map((value, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={value}
          defaultValue={tempValue}
          onChange={(e) => handleTextChange(e.target.value, index)}
          ref={(ref) => {
            inputRef.current[index] = ref as HTMLInputElement;
          }}
          className="border border-solid w-[19px] text-center h-[24px] px-[1px] rounded-md border-border-slate-500 focus:border-blue-600  outline-none"
          style={{ marginRight: index === VATTIN.length - 1 ? "0" : "1px" }}
        />
      ))}
    </div>
  );
};

export default InsertVatNumber;
