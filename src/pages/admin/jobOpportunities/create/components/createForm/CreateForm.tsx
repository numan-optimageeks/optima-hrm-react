import { useLocation, useNavigate } from "react-router";
import { useAxios } from "src/hooks/useAxios";
import { useToast } from "src/hooks/useToast";
import {
  ICreateJob,
  initialValues,
  validations,
} from "../../data/initialValues";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { transformJobFieldValues } from "../../data/helper";
import { transformError } from "src/helpers/transformError";
import { useFormik } from "formik";
import Loader from "src/components/Loader/Loader";
import { Box } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import { StyledForm, StyledFullInput, StyledInput } from "./CreateForm.style";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import {
  DesignationsTypes,
  EmployementTypes,
  ExperianceTypes,
  JobStatusTypes,
  LocationTypes,
  UrgencyLevelTypes,
} from "../../data/constants";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

const CreateForm = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const toast = useToast();
  const location = useLocation();
  const editState: ICreateJob = location?.state;
  const [loading, setLoading] = useState(false);
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });

  useEffect(() => {
    if (editState?.id) {
      const editValues = transformJobFieldValues(editState);
      setInitialValue(editValues);
    }
  }, [editState]);

  const handleFormSubmit = async (values: ICreateJob) => {
    setLoading(true);
    try {
      const payload = {
        ...transformJobFieldValues(values),
        noOfHiring: Number(values?.noOfHiring),
        userId: user?.id,
      };
      if (editState?.id) {
        await AxiosClient.put(`/job-position/update/${editState?.id}`, payload);
      } else {
        await AxiosClient.post(`/job-position/create`, payload);
      }
      navigate("/job-opportunities");
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
    handleChange,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: validations,
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  });

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {loading && <Loader />}

      <StyledForm>
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
        <StyledInput>
          <CustomInput
            label="Date(when position open)"
            type={"date"}
            id="openingDate"
            helperText={
              isError("openingDate", errors, touched)
                ? isErrorMessage("openingDate", errors)
                : ""
            }
            error={isError("openingDate", errors, touched)}
            {...getFieldProps("openingDate")}
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Position"
            type={"text"}
            id="position"
            placeholder="Position"
            helperText={
              isError("position", errors, touched)
                ? isErrorMessage("position", errors)
                : ""
            }
            error={isError("position", errors, touched)}
            {...getFieldProps("position")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="No of hiring"
            type={"text"}
            id="noOfHiring"
            placeholder="No of hiring"
            SelectProps={{
              native: true,
            }}
            helperText={
              isError("noOfHiring", errors, touched)
                ? isErrorMessage("noOfHiring", errors)
                : ""
            }
            error={isError("noOfHiring", errors, touched)}
            {...getFieldProps("noOfHiring")}
            onChange={handleChange}
          >
            {Array.from({ length: 10 }, (_, i) => i + 1)?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            select
            label="Level of Experience"
            id="experiance"
            placeholder="Level of Experience"
            helperText={
              isError("experiance", errors, touched)
                ? isErrorMessage("experiance", errors)
                : ""
            }
            error={isError("experiance", errors, touched)}
            {...getFieldProps("experiance")}
            SelectProps={{
              native: true,
            }}
          >
            {ExperianceTypes?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="Designation"
            id="designation"
            placeholder="Designation"
            helperText={
              isError("designation", errors, touched)
                ? isErrorMessage("designation", errors)
                : ""
            }
            error={isError("designation", errors, touched)}
            {...getFieldProps("designation")}
            SelectProps={{
              native: true,
            }}
          >
            {DesignationsTypes?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Budget"
            type={"text"}
            id="budget"
            placeholder="Budget"
            helperText={
              isError("budget", errors, touched)
                ? isErrorMessage("budget", errors)
                : ""
            }
            error={isError("budget", errors, touched)}
            {...getFieldProps("budget")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="Employment type"
            id="employmentType"
            placeholder="Employment type"
            helperText={
              isError("employmentType", errors, touched)
                ? isErrorMessage("employmentType", errors)
                : ""
            }
            error={isError("employmentType", errors, touched)}
            {...getFieldProps("employmentType")}
            SelectProps={{
              native: true,
            }}
          >
            {EmployementTypes?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            select
            label="Location"
            id="location"
            placeholder="Location"
            helperText={
              isError("location", errors, touched)
                ? isErrorMessage("location", errors)
                : ""
            }
            error={isError("location", errors, touched)}
            {...getFieldProps("location")}
            SelectProps={{
              native: true,
            }}
          >
            {LocationTypes?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="Urgency Level"
            id="urgencyLevel"
            placeholder="Urgency Level"
            helperText={
              isError("urgencyLevel", errors, touched)
                ? isErrorMessage("urgencyLevel", errors)
                : ""
            }
            error={isError("urgencyLevel", errors, touched)}
            {...getFieldProps("urgencyLevel")}
            SelectProps={{
              native: true,
            }}
          >
            {UrgencyLevelTypes?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Requested By"
            type={"text"}
            id="requestedBy"
            placeholder="Requested By"
            helperText={
              isError("requestedBy", errors, touched)
                ? isErrorMessage("requestedBy", errors)
                : ""
            }
            error={isError("requestedBy", errors, touched)}
            {...getFieldProps("requestedBy")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="Status"
            id="status"
            placeholder="Status"
            helperText={
              isError("status", errors, touched)
                ? isErrorMessage("status", errors)
                : ""
            }
            error={isError("status", errors, touched)}
            {...getFieldProps("status")}
            SelectProps={{
              native: true,
            }}
          >
            {JobStatusTypes?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledFullInput>
          <CustomInput
            label="Technical Specification"
            type={"text"}
            id="technicalSpecification"
            placeholder="Technical Specification"
            helperText={
              isError("technicalSpecification", errors, touched)
                ? isErrorMessage("technicalSpecification", errors)
                : ""
            }
            error={isError("technicalSpecification", errors, touched)}
            {...getFieldProps("technicalSpecification")}
            rows={2}
            multiline
          />
        </StyledFullInput>
      </StyledForm>

      <StyledForm>
        <StyledFullInput>
          <CustomInput
            label="Other Requirements"
            type={"text"}
            id="otherRequirements"
            placeholder="Other Requirements"
            helperText={
              isError("otherRequirements", errors, touched)
                ? isErrorMessage("otherRequirements", errors)
                : ""
            }
            error={isError("otherRequirements", errors, touched)}
            {...getFieldProps("otherRequirements")}
            rows={2}
            multiline
          />
        </StyledFullInput>
      </StyledForm>

      <Box display={"flex"} justifyContent={"flex-end"}>
        <CustomButton
          variant="outlined"
          onClick={() => navigate("/job-opportunities")}
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
