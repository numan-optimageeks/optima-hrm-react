import { useDispatch, useSelector } from "react-redux";
import { transformError } from "src/helpers/transformError";
import { useAxios } from "src/hooks/useAxios";
import { useToast } from "src/hooks/useToast";
import {
  IUpdateProfile,
  UpdateProfileInitialValues,
} from "./data/initialValues";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography } from "@mui/material";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import {
  StyledEditIcon,
  StyledImage,
  StyledImageContainer,
  StyledImageInput,
} from "./UpdateProfile.style";
import defaultProfile from "src/assests/images/default-profile.png";
import CustomButton from "src/components/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { RootState } from "src/store/store";

const UpdateProfile = ({ setLoading }) => {
  const AxiosClient = useAxios();
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [icon, setIcon] = useState(null);

  const [initialValues, setInitialValues] = useState({
    ...UpdateProfileInitialValues(),
  });

  useEffect(() => {
    const updatedValues = {
      name: user?.full_name,
      image: user?.image || "",
    };
    setInitialValues(updatedValues);
  }, []);

  const handleFormSubmit = async (
    values: IUpdateProfile,
    formikHelpers: FormikHelpers<IUpdateProfile>
  ) => {
    setLoading(true);
    console.log("values", values, icon);
    try {
    } catch (err) {
      formikHelpers?.setSubmitting(false);
      toast.error(transformError(err)?.message);
    }
    setLoading(false);
  };

  const {
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    dirty,
    isSubmitting,
    setFieldValue,
    values,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({}),
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setFieldValue("image", URL.createObjectURL(file));
    setIcon(file);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" style={{ width: "100%" }}>
      <Typography variant="h5" marginBottom={"20px"}>
        Update Profile:
      </Typography>
      <StyledImageContainer htmlFor="image">
        <StyledImageInput
          accept="image/*"
          id="image"
          type="file"
          name="image"
          onChange={handleFileChange}
        />
        <StyledImage src={values?.image || defaultProfile} alt="profile-icon" />
        <StyledEditIcon />
      </StyledImageContainer>

      <CustomInput
        label="Full Name"
        type={"text"}
        id="name"
        placeholder="Full Name"
        helperText={
          isError("name", errors, touched) ? isErrorMessage("name", errors) : ""
        }
        error={isError("name", errors, touched)}
        name="name"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values?.name}
        sx={{ marginBottom: "20px" }}
      />
      <Box display={"flex"} justifyContent={"flex-end"}>
        <CustomButton variant="contained" type="submit">
          Update
        </CustomButton>
      </Box>
    </form>
  );
};
export default UpdateProfile;
