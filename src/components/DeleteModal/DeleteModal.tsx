import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { Modal } from "@mui/material";
import React from "react";
import CustomButton from "../CustomButton/CustomButton";

interface IDeleteModal {
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleYes: () => Promise<void>;
}

const DeleteAlert: React.FC<IDeleteModal> = ({
  deleteModal,
  setDeleteModal,
  handleYes,
}) => {
  return (
    <Modal
      open={deleteModal}
      onClose={() => setDeleteModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ zIndex: 22000 }}
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          marginBottom={"20px"}
        >
          Are you sure you want to delete?
        </Typography>
        <Box display={"flex"} justifyContent="space-evenly">
          <CustomButton
            variant="outlined"
            sx={{ width: "100px" }}
            onClick={handleYes}
          >
            Yes
          </CustomButton>
          <CustomButton
            variant="outlined"
            sx={{ width: "100px" }}
            onClick={() => setDeleteModal(false)}
          >
            No
          </CustomButton>
        </Box>
      </Box>
    </Modal>
  );
};
export default DeleteAlert;
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};
