import { Box, styled } from "@mui/material";

export const StyledContainer = styled(Box)(
  ({ theme }) => `
display:flex;
width:100%;
justify-content:space-between;
@media only screen and (max-width: 650px) {
    flex-direction:column;
  }
`
);

export const StyledSection = styled(Box)(
  ({ theme }) => `
display:flex;
width:49%;
@media only screen and (max-width: 650px) {
    margin-bottom:20px;
    width:100%;
    justify-content:center;
    }
`
);
export const StyledInfoSection = styled(Box)(
  ({ theme }) => `
  display:flex;
  flex-direction:column;
  width:49%;
  @media only screen and (max-width: 650px) {
    width:100%;
  }`
);

export const StyledImageContainer = styled(Box)(
  ({ theme }) => `
    width:auto;
    height:300px;
    border-radius: 16px;
    overflow: hidden;
  
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

export const DetailSection = styled(Box)(
  ({ theme }) => `
          display:flex;
          width:100%;
          margin-bottom:10px;
          align-items: center;
            `
);
