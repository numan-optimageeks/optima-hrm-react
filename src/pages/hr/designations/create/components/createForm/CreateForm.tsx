import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAxios } from "src/hooks/useAxios";
import { IDesignation } from "src/pages/hr/departments/create/data/interface";
import {
  CreateDesignation,
  initialValues,
  validations,
} from "../../data/initialValues";
import { useFormik } from "formik";
import CustomButton from "src/components/CustomButton/CustomButton";
import { Box } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import { transformError } from "src/helpers/transformError";
import { useToast } from "src/hooks/useToast";
import Loader from "src/components/Loader/Loader";

const CreateForm = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const location = useLocation();
  const editState: IDesignation = location?.state;
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editState?.id) {
      const editValues = {
        name: editState?.designation || "",
        abbrevation: editState?.abbreviation || "",
        desc: editState?.description || "",
      };
      setInitialValue(editValues);
    }
  }, [editState]);
  const handleFormSubmit = async (values: CreateDesignation) => {
    setLoading(true);
    try {
      const payload = {
        designation: values?.name,
        abbreviation: values?.abbrevation,
        description: values?.desc,
      };
      if (editState?.id) {
        await AxiosClient.put(`/designation/update/${editState?.id}`, payload);
      } else {
        await AxiosClient.post(`/designation/create`, payload);
      }
      navigate("/designations");
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
        label="Designation"
        type={"text"}
        id="name"
        placeholder="Designation"
        helperText={
          isError("name", errors, touched) ? isErrorMessage("name", errors) : ""
        }
        error={isError("name", errors, touched)}
        {...getFieldProps("name")}
      />
      <CustomInput
        label="Abbrevation"
        type={"text"}
        id="abbrevation"
        placeholder="Abbrevation"
        helperText={
          isError("abbrevation", errors, touched)
            ? isErrorMessage("abbrevation", errors)
            : ""
        }
        error={isError("abbrevation", errors, touched)}
        {...getFieldProps("abbrevation")}
        sx={{ marginTop: "20px" }}
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
          onClick={() => navigate("/designation")}
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
