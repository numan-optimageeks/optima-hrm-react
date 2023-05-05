import { useState } from "react";
import { StyledDialog, StyledStatus } from "./PositionStatus.style";
import {
  DialogTitle,
  FormControlLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { JobStatusTypes } from "../../../create/data/constants";
import { useAxios } from "src/hooks/useAxios";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";

const PositionStatus = ({ row, jobsList, setJobsList }) => {
  const [open, setOpen] = useState(false);
  const AxiosClient = useAxios();
  const toast = useToast();
  const [selectedValue, setSelectedValue] = useState(row?.status || "");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleListItemClick = async (
    value: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const currentValue = value?.target?.value;

      setOpen(false);
      setSelectedValue(currentValue);
      await AxiosClient.put(`/job-position/update/${row?.id}`, {
        status: currentValue,
      });
      const jobsCopy = [...jobsList];
      const target = jobsCopy?.find((job) => job?.id === row?.id);
      target.status = currentValue;
      setJobsList(jobsCopy);
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
  };

  return (
    <>
      <StyledStatus value={row?.status} onClick={handleClickOpen}>
        {row?.status}
      </StyledStatus>
      <StyledDialog onClose={() => setOpen(false)} open={open}>
        <DialogTitle>
          <b>Change Status</b>
        </DialogTitle>
        <List sx={{ p: "0px 20px" }}>
          <RadioGroup
            name="select-status"
            onChange={handleListItemClick}
            value={selectedValue}
          >
            {JobStatusTypes?.map((item, index) => {
              return (
                <FormControlLabel
                  key={index}
                  value={item?.value}
                  control={<Radio />}
                  label={item?.label}
                />
              );
            })}
          </RadioGroup>
        </List>
      </StyledDialog>
    </>
  );
};
export default PositionStatus;
