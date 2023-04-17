import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAxios } from "src/hooks/useAxios";
import {
  CreateApplicant,
  initialValues,
  validations,
} from "../../data/initialValues";
import { IApplicant } from "../../data/interface";
import states from "src/pages/hr/employees/create/data/states.json";
import { StyledForm, StyledInput } from "./CreateForm.style";
import { isError, isErrorMessage } from "src/utils/utils";
import CustomInput from "src/components/CustomInput/CustomInput";
import InputMask from "react-input-mask";
import { GenderTypes } from "../../data/constants";
import { Box } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";
import Loader from "src/components/Loader/Loader";

const CreateForm = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const location = useLocation();
  const editState: IApplicant = location?.state;
  const [details, setDetails] = useState([]);
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editState?.id) {
      const editValues = {
        address: editState?.address || "",
        age: editState?.age || "",
        city: editState?.city || "",
        cnic: editState?.cnic || "",
        education: editState?.education || "",
        email: editState?.email || "",
        fullName: editState?.fullName || "",
        gender: editState?.gender || "",
        phoneNumber: editState?.phoneNumber || "",
        state: editState?.state || "",
      };
      setInitialValue(editValues);
    }
  }, [editState]);

  const handleFormSubmit = async (values: CreateApplicant) => {
    setLoading(true);
    try {
      const payload = {
        address: values?.address || "",
        age: values?.age || "",
        city: values?.city || "",
        cnic: values?.cnic || "",
        education: values?.education || "",
        email: values?.email || "",
        fullName: values?.fullName || "",
        gender: values?.gender || "",
        phoneNumber: values?.phoneNumber || "",
        state: values?.state || "",
      };
      if (editState?.id) {
        await AxiosClient.put(`/applicant/update/${editState?.id}`, payload);
      } else {
        await AxiosClient.post(`/applicant/create`, payload);
      }
      navigate("/applicants");
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
    values,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: validations,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });
  const getStates = () => {
    return states?.map((item) => {
      return {
        label: item?.name,
        value: item?.name,
      };
    });
  };
  const getCities = () => {
    return states
      ?.find((val) => val?.name === (values?.state || "Punjab"))
      ?.cities?.map((item) => {
        return {
          label: item?.name,
          value: item?.name,
        };
      });
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {loading && <Loader />}
      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Name"
            type={"text"}
            id="fullName"
            placeholder="Name"
            helperText={
              isError("fullName", errors, touched)
                ? isErrorMessage("fullName", errors)
                : ""
            }
            error={isError("fullName", errors, touched)}
            {...getFieldProps("fullName")}
          />
        </StyledInput>
        <StyledInput>
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
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <InputMask
            mask="9999999999999"
            maskplaceholder=""
            alwaysShowMask={false}
            {...getFieldProps("cnic")}
            onChange={(e) => {
              if (e?.target?.value !== "_____ _______ _") handleChange(e);
            }}
          >
            {(inputProps) => (
              <CustomInput
                label="CNIC"
                type={"text"}
                id="cnic"
                helperText={
                  isError("cnic", errors, touched)
                    ? isErrorMessage("cnic", errors)
                    : ""
                }
                error={isError("cnic", errors, touched)}
                value={values?.cnic}
                {...inputProps}
              />
            )}
          </InputMask>
        </StyledInput>
        <StyledInput>
          <InputMask
            mask="+99 999 999 9999"
            maskplaceholder=""
            alwaysShowMask={false}
            {...getFieldProps("phoneNumber")}
          >
            {(inputProps) => (
              <CustomInput
                label="Phone Number"
                type={"text"}
                id="phoneNumber"
                placeholder="Phone Number"
                helperText={
                  isError("phoneNumber", errors, touched)
                    ? isErrorMessage("phoneNumber", errors)
                    : ""
                }
                error={isError("phoneNumber", errors, touched)}
                {...inputProps}
              />
            )}
          </InputMask>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            select
            label="Gender"
            id="gender"
            placeholder="Gender"
            helperText={
              isError("gender", errors, touched)
                ? isErrorMessage("gender", errors)
                : ""
            }
            error={isError("gender", errors, touched)}
            {...getFieldProps("gender")}
            SelectProps={{
              native: true,
            }}
          >
            {GenderTypes?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="Age"
            type={"text"}
            id="age"
            placeholder="Age"
            helperText={
              isError("age", errors, touched)
                ? isErrorMessage("age", errors)
                : ""
            }
            error={isError("age", errors, touched)}
            {...getFieldProps("age")}
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <CustomInput
          label="Education"
          type={"text"}
          id="education"
          placeholder="Education"
          helperText={
            isError("education", errors, touched)
              ? isErrorMessage("education", errors)
              : ""
          }
          error={isError("education", errors, touched)}
          {...getFieldProps("education")}
        />
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            select
            label="State"
            id="state"
            placeholder="State"
            helperText={
              isError("state", errors, touched)
                ? isErrorMessage("state", errors)
                : ""
            }
            error={isError("state", errors, touched)}
            {...getFieldProps("state")}
            SelectProps={{
              native: true,
            }}
          >
            {getStates()?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="City"
            id="city"
            placeholder="City"
            helperText={
              isError("city", errors, touched)
                ? isErrorMessage("city", errors)
                : ""
            }
            error={isError("city", errors, touched)}
            {...getFieldProps("city")}
            SelectProps={{
              native: true,
            }}
          >
            {getCities()?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <CustomInput
          label="Address"
          type={"text"}
          id="address"
          placeholder="Address"
          helperText={
            isError("address", errors, touched)
              ? isErrorMessage("address", errors)
              : ""
          }
          error={isError("address", errors, touched)}
          {...getFieldProps("address")}
          rows={2}
          multiline
        />
      </StyledForm>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <CustomButton
          variant="outlined"
          onClick={() => navigate("/applicants")}
        >
          Cancel
        </CustomButton>
        <CustomButton
          variant="contained"
          type="submit"
          //   disabled={!(isValid && dirty) || isSubmitting}
          sx={{ marginLeft: "20px" }}
        >
          Create
        </CustomButton>
      </Box>
    </form>
  );
};
export default CreateForm;
