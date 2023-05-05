import { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import { TOKEN, USER } from "src/constants/constants";
import { removeUser } from "src/store/features/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "src/store/store";
import { NavLink } from "react-router-dom";
import AccountBoxTwoToneIcon from "@mui/icons-material/AccountBoxTwoTone";
import defaultImage from "src/assests/images/default-profile.png";

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
        text-transform: uppercase;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)};
        text-transform: uppercase;
`
);

const HeaderUserbox = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };
  const logoutUser = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <>
      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar
          variant="rounded"
          alt={user?.full_name || ""}
          src={
            user?.image
              ? `${process.env.REACT_APP_MAILING_BACKEND}/${user?.image}`
              : defaultImage
          }
        />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.full_name || ""}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.role || ""}
            </UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar
            variant="rounded"
            alt={user?.full_name || ""}
            src={
              user?.image
                ? `${process.env.REACT_APP_MAILING_BACKEND}/${user?.image}`
                : defaultImage
            }
          />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user?.full_name || ""}</UserBoxLabel>
            <UserBoxDescription variant="body2">
              {user?.role || ""}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem
            button
            to="/profile"
            component={NavLink}
            onClick={handleClose}
          >
            <AccountBoxTwoToneIcon fontSize="small" />
            <ListItemText primary="My Profile" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={logoutUser}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
};

export default HeaderUserbox;
