import { useFormik } from "formik";
import {
  CreateDepartment,
  initialValues,
  validations,
} from "../../data/initialValues";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import { Box } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import { useLocation, useNavigate } from "react-router";
import { useAxios } from "src/hooks/useAxios";
import { IDepartment } from "../../../view/ViewDepartment";
import { useEffect, useState } from "react";

const CreateForm = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const location = useLocation();
  const editState: IDepartment = location?.state;
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });
  useEffect(() => {
    if (editState?.id) {
      const editValues = {
        name: editState?.department || "",
        desc: editState?.description || "",
      };
      setInitialValue(editValues);
    }
  }, [editState]);
  const handleFormSubmit = async (values: CreateDepartment) => {
    try {
      const payload = {
        department: values?.name,
        description: values?.desc,
      };
      const res = await AxiosClient.post(
        `${process.env.REACT_APP_MAILING_BACKEND}/department/create`,
        payload
      );
      console.log(res?.data?.message);
      navigate("/departments");
    } catch (err) {
      console.log("Error while create department");
    }
  };
  const {
    errors,
    touched,
    getFieldProps,
    handleSubmit,
    isValid,
    dirty,
    isSubmitting,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: validations,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <CustomInput
        label="Department"
        type={"text"}
        id="name"
        placeholder="Department name"
        helperText={
          isError("name", errors, touched) ? isErrorMessage("name", errors) : ""
        }
        error={isError("name", errors, touched)}
        {...getFieldProps("name")}
      />

      <CustomInput
        label="Description"
        type={"text"}
        id="desc"
        placeholder="Description..."
        helperText={
          isError("desc", errors, touched) ? isErrorMessage("desc", errors) : ""
        }
        error={isError("desc", errors, touched)}
        {...getFieldProps("desc")}
        sx={{ margin: "20px 0px" }}
        multiline
        rows={4}
      />
      <Box display={"flex"} justifyContent={"flex-end"}>
        <CustomButton
          variant="outlined"
          onClick={() => navigate("/departments")}
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant="contained"
          type="submit"
          disabled={!(isValid && dirty) || isSubmitting}
          sx={{ marginLeft: "20px" }}
        >
          Create
        </CustomButton>
      </Box>
    </form>
  );
};
export default CreateForm;
