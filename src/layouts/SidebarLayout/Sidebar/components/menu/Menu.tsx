import { useTheme } from "@mui/material";
import { SideBarData } from "./data/sideBarData";
import MenuItem from "../menuItem/MenuItem";

const Menu = () => {
  const theme = useTheme();
  const iconColor = { color: theme.colors.alpha.trueWhite[70] };

  const sideBarData = SideBarData(iconColor);

  return (
    <>
      {sideBarData?.map((item, index) => {
        return <MenuItem data={item} key={index} />;
      })}
    </>
  );
};
export default Menu;
