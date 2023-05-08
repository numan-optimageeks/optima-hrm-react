import { styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const StyledImageContainer = styled("label")(
  ({ theme }) => `
  display: block;
      width:fit-content;
      height:300px;
      border-radius: 16px;
      overflow: hidden;
      margin-bottom:20px;
      position: relative;
      cursor:pointer;
  `
);
export const StyledImageInput = styled("input")(
  ({ theme }) => `
        display:none;
    `
);
export const StyledImage = styled("img")(
  ({ theme }) => `
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.3s ease;
      transform-origin: center;
      will-change: transform;
      &:hover {
          transform: scale(1.1);
      }
      `
);
export const StyledEditIcon = styled(EditIcon)(
  ({ theme }) => `
      position: absolute;
      top: 10px;
      right: 10px;
      zindex: 11000;
        `
);
