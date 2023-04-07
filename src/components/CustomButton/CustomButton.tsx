import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";

interface ICustomButton extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<ICustomButton> = ({ children, ...rest }) => {
  return <Button {...rest}>{children}</Button>;
};
export default CustomButton;
