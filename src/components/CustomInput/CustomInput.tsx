import React from "react";
import { TextFieldProps, TextField, styled } from "@mui/material";

const TextFieldComponent = styled(TextField)(
  ({ theme }) => `
  width:100%;
  p,
  .Mui-error {
    color: #fb2878 !important;
  }
  .Mui-error {
    border-color: #fb2878 !important;
  }
`
);

const CustomInput: React.FC<TextFieldProps> = ({ ...rest }) => {
  return <TextFieldComponent {...rest} />;
};
export default CustomInput;
