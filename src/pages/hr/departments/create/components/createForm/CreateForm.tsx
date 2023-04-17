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
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";
import Loader from "src/components/Loader/Loader";

const CreateForm = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const location = useLocation();
  const editState: IDepartment = location?.state;
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    try {
      const payload = {
        department: values?.name,
        description: values?.desc,
      };
      if (editState?.id) {
        await AxiosClient.put(`/department/update/${editState?.id}`, payload);
      } else {
        await AxiosClient.post(`/department/create`, payload);
      }
      navigate("/departments");
    } catch (err) {
      toast.error(transformError(err)?.message);
    }
    setLoading(false);
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
      {loading && <Loader />}
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
          {editState?.id ? "Save" : "Create"}
        </CustomButton>
      </Box>
    </form>
  );
};
export default CreateForm;
