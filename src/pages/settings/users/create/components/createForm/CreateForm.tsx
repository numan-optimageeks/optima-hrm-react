import { useLocation, useNavigate } from "react-router";
import { useAxios } from "src/hooks/useAxios";
import { IUser } from "../../data/interface";
import { useEffect, useState } from "react";
import {
  CreateUser,
  editValidations,
  initialValues,
  validations,
} from "../../data/initialValues";
import { useFormik } from "formik";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import { Box, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomButton from "src/components/CustomButton/CustomButton";

const CreateForm = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const location = useLocation();
  const editState: IUser = location?.state;
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [validation, setValidation] = useState(validations);
  useEffect(() => {
    if (editState?.id) {
      const editValues = {
        email: editState?.email || "",
        full_name: editState?.full_name || "",
      };
      setInitialValue(editValues);
      //@ts-ignore
      setValidation(editValidations);
    }
  }, [editState]);
  const handleFormSubmit = async (values: CreateUser) => {
    try {
      const payload = {
        email: values?.email || "",
        full_name: values?.full_name || "",
        password: values?.password || "",
        role: values?.role || "",
      };
      if (editState?.id) {
        delete payload.password;
        delete payload.role;

        await AxiosClient.put(`/users/update/${editState?.id}`, payload);
      } else {
        await AxiosClient.post(`users/create-user`, payload);
      }
      navigate("/users");
    } catch (err) {
      console.log("Error while create user");
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
    validationSchema: validation,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const passwordEye = () => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleClickShowPassword}
          onMouseDown={handleMouseDownPassword}
          sx={{ marginRight: "1px" }}
          edge="end"
        >
          {showPassword ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <CustomInput
        label="Name"
        type={"text"}
        id="full_name"
        placeholder="Name"
        helperText={
          isError("full_name", errors, touched)
            ? isErrorMessage("full_name", errors)
            : ""
        }
        error={isError("full_name", errors, touched)}
        {...getFieldProps("full_name")}
      />
      <CustomInput
        label="E-mail"
        type={"text"}
        id="email"
        placeholder="E-mail"
        helperText={
          isError("email", errors, touched)
            ? isErrorMessage("email", errors)
            : ""
        }
        error={isError("email", errors, touched)}
        {...getFieldProps("email")}
        sx={{ margin: "20px 0px" }}
      />
      {!editState?.id && (
        <CustomInput
          type={showPassword ? "text" : "password"}
          id="password"
          label="Password"
          placeholder="Password"
          helperText={
            isError("password", errors, touched)
              ? isErrorMessage("password", errors)
              : ""
          }
          error={isError("password", errors, touched)}
          InputProps={{
            endAdornment: passwordEye(),
          }}
          {...getFieldProps("password")}
          sx={{ margin: "20px 0px" }}
        />
      )}
      <Box display={"flex"} justifyContent={"flex-end"}>
        <CustomButton variant="outlined" onClick={() => navigate("/users")}>
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
