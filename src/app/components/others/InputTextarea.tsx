import * as React from "react";
import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import ComponentTab from "../Elements/ComponentTab";

export default function UnstyledTextareaIntroduction({
  textValue,
  itemKey,
  onTextChange,
  textAlign,
  fonstStyle,
  whiteSpace,
  labelValue,
  textDecoration,
}: any) {
  const [newTextValue, setNewTextValue] = React.useState(textValue);
  React.useEffect(() => {
  }, []);

  const handleTextChange = (e: any, itemKey: any) => {
    e.preventDefault();
    const value = e.target.value;
    setNewTextValue(value);
    onTextChange(value, itemKey);
  };

  return (
    <>
        <TextareaAutosize
          onChange={(e) => {
            handleTextChange(e, itemKey);
          }}
          aria-label="empty textarea"
          placeholder=""
          style={{height: '80%', width: "98%"}}
          defaultValue={textValue}
          value={`${newTextValue}`}
          className={`${textAlign} ${fonstStyle} ${textDecoration} ${whiteSpace} z-20 pl-[2px] no-resize p-0 w-full`}
        />
    </>
  );
}



const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const TextareaAutosize = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  border-radius: 4px;
  background: none;
  border: 0px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 0px 0px ${
    theme.palette.mode === "dark" ? grey[900] : grey[50]
  };

  

 

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
