import { useState } from "react";
import { useAxios } from "src/hooks/useAxios";
import { useToast } from "src/hooks/useToast";
import {
  IUpdatePassword,
  InputConstants,
  showPasswordState,
  updatePasswordInitialValues,
  updatePasswordValidations,
} from "./data/initialValues";
import { transformError } from "src/helpers/transformError";
import { FormikHelpers, useFormik } from "formik";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import CustomButton from "src/components/CustomButton/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const UpdatePassword = ({ setLoading }) => {
  const AxiosClient = useAxios();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(showPasswordState());
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClickShowPassword = (type: string) => {
    setShowPassword((show) => {
      return { ...show, [type]: !show[type] };
    });
  };

  const handleFormSubmit = async (
    values: IUpdatePassword,
    formikHelpers: FormikHelpers<IUpdatePassword>
  ) => {
    setLoading(true);
    try {
      const payload = {
        password: values?.password || "",
        newPassword: values?.newPassword || "",
        confirmPassword: values?.confirmPassword || "",
      };
      await AxiosClient.put(
        `${process.env.REACT_APP_MAILING_BACKEND}/users/updatePassword/${user?.id}`,
        payload
      );
    } catch (err) {
      formikHelpers?.setSubmitting(false);
      toast.error(transformError(err)?.message);
    }
    setLoading(false);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
    initialValues: updatePasswordInitialValues(),
    validationSchema: updatePasswordValidations,
    onSubmit: handleFormSubmit,
  });
  const passwordEye = (type: string) => {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={() => handleClickShowPassword(type)}
          onMouseDown={handleMouseDownPassword}
          sx={{ marginRight: "1px" }}
          edge="end"
        >
          {showPassword[type] ? <Visibility /> : <VisibilityOff />}
        </IconButton>
      </InputAdornment>
    );
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <Typography variant="h5" marginBottom={"20px"}>
        Update Password:
      </Typography>
      {InputConstants?.map(({ id, label }, index: number) => (
        <CustomInput
          key={index}
          type={showPassword[id] ? "text" : "password"}
          id={id}
          label={label}
          placeholder={label}
          helperText={
            isError(id, errors, touched) ? isErrorMessage(id, errors) : ""
          }
          error={isError(id, errors, touched)}
          InputProps={{
            endAdornment: passwordEye(id),
          }}
          {...getFieldProps(id)}
          sx={{ margin: index === 1 ? "20px 0px" : "0px" }}
        />
      ))}
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: "20px" }}
      >
        <CustomButton
          variant="contained"
          type="submit"
          //  unComment below line to add validations
          // disabled={!(isValid && dirty) || isSubmitting}
        >
          Update
        </CustomButton>
      </Box>
    </form>
  );
};
export default UpdatePassword;
