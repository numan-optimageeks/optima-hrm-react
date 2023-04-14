import { useLocation, useNavigate } from "react-router";
import {
  StyledForm,
  StyledInput,
  StyledLabel,
} from "./EmployementDetails.style";
import { useAxios } from "src/hooks/useAxios";
import { useEffect, useState } from "react";
import {
  ICreateInterview,
  initialValues,
  validations,
} from "../../data/initialValues";
import { useFormik } from "formik";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import { InterviewTypes, RecomendTypes } from "../../data/constants";
import { format } from "date-fns";
import { Box } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";

const EmployementDetails = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const location = useLocation();
  //@ts-ignore
  const editState: ICreateInterview = location?.state?.interview;
  const [details, setDetails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });
  // console.log("editstate", editState);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await AxiosClient.post(`/employee/`);
        setEmployees(res?.data?.data);
      } catch (err) {
        console.log("error while get employees");
      }
    };
    getEmployees();
  }, []);

  useEffect(() => {
    const getDate = () => {
      const date = new Date();
      return `${format(date, "yyyy-MM-dd")}T${format(date, "HH:mm")}`;
    };
    //@ts-ignore
    if (editState?.id) {
      const editValues = {
        interviewerId: editState?.interviewerId || null,
        interviewerName: editState?.interviewerName || "",
        status: editState?.status || "",
        interviewTimings: editState?.interviewTimings || getDate(),
        appliedFor: editState?.appliedFor || "",
        currentCompany: editState?.currentCompany || "",
        currentCompanyExperience: editState?.currentCompanyExperience || "",
        teamLeadExperience: editState?.teamLeadExperience || "",
        totalExperience: editState?.totalExperience || "",
        applicantId: editState?.applicantId || "",
        companyContactPerson: editState?.companyContactPerson || "",
        currentSalary: editState?.currentSalary || "",
        expectedSalary: editState?.expectedSalary || "",
        noticePeriod: editState?.noticePeriod || "",

        hrScore: editState?.hrScore || "",
        technicalScore: editState?.technicalScore || "",
        hrRemarks: editState?.hrRemarks || "",
        interviewerRemarks: editState?.interviewerRemarks || "",
        recommendationStatus: editState?.recommendationStatus || "",
      };
      setInitialValue(editValues);
    }
  }, [editState]);

  const handleFormSubmit = async (values: ICreateInterview) => {
    try {
      const payload = {
        interviewerId: values?.interviewerId || null,
        interviewerName: values?.interviewerName || "",
        status: values?.status || "",
        interviewTimings: values?.interviewTimings || "",
        appliedFor: values?.appliedFor || "",
        currentCompany: values?.currentCompany || "",
        currentCompanyExperience: values?.currentCompanyExperience || "",
        teamLeadExperience: values?.teamLeadExperience || "",
        totalExperience: values?.totalExperience || "",
        // applicantId: values?.applicantId || "",
        companyContactPerson: values?.companyContactPerson || "",
        currentSalary: values?.currentSalary || "",
        expectedSalary: values?.expectedSalary || "",
        noticePeriod: values?.noticePeriod || "",

        hrScore: values?.hrScore || "",
        technicalScore: values?.technicalScore || "",
        hrRemarks: values?.hrRemarks || "",
        interviewerRemarks: values?.interviewerRemarks || "",
        recommendationStatus: values?.recommendationStatus || "",
      };
      //@ts-ignore
      if (editState?.id) {
        //@ts-ignore
        await AxiosClient.put(`/interview/update/${editState?.id}`, payload);
      } else {
        await AxiosClient.post(`/interview/createNewEntry`, payload);
      }
      navigate("/interviews");
    } catch (err) {
      console.log("Error while create interview");
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
  const getInterviewer = () => {
    const emp = employees?.map((item) => {
      return {
        label: item?.fullName,
        value: item?.id,
      };
    });
    return [
      {
        label: "",
        value: "",
      },
      ...(emp || []),
    ];
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <StyledLabel variant="h5">Employement Details</StyledLabel>
      <StyledForm>
        <StyledInput>
          <CustomInput
            select
            label="Interviewer"
            id="interviewerName"
            placeholder="Interviewer"
            helperText={
              isError("interviewerName", errors, touched)
                ? isErrorMessage("interviewerName", errors)
                : ""
            }
            error={isError("interviewerName", errors, touched)}
            {...getFieldProps("interviewerName")}
            SelectProps={{
              native: true,
            }}
            onChange={(e) => {
              const value = getInterviewer()?.find(
                (val) => val?.value === e?.target?.value
              );
              setFieldValue("interviewerName", value?.label);
              setFieldValue("interviewerId", value?.value);
            }}
          >
            {getInterviewer()?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </CustomInput>
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="Interview Status"
            id="status"
            placeholder="Interview Status"
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
            {InterviewTypes?.map((option) => (
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
            label="Interview Time"
            type={"datetime-local"}
            id="interviewTimings"
            helperText={
              isError("interviewTimings", errors, touched)
                ? isErrorMessage("interviewTimings", errors)
                : ""
            }
            error={isError("interviewTimings", errors, touched)}
            {...getFieldProps("interviewTimings")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="Applied For"
            type={"text"}
            id="appliedFor"
            placeholder="Applied For"
            helperText={
              isError("appliedFor", errors, touched)
                ? isErrorMessage("appliedFor", errors)
                : ""
            }
            error={isError("appliedFor", errors, touched)}
            {...getFieldProps("appliedFor")}
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Current Company"
            type={"text"}
            id="currentCompany"
            placeholder="Current Company"
            helperText={
              isError("currentCompany", errors, touched)
                ? isErrorMessage("currentCompany", errors)
                : ""
            }
            error={isError("currentCompany", errors, touched)}
            {...getFieldProps("currentCompany")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="Current Company Experience"
            type={"text"}
            id="currentCompanyExperience"
            placeholder="Current Company Experience"
            helperText={
              isError("currentCompanyExperience", errors, touched)
                ? isErrorMessage("currentCompanyExperience", errors)
                : ""
            }
            error={isError("currentCompanyExperience", errors, touched)}
            {...getFieldProps("currentCompanyExperience")}
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Total Experiance"
            type={"text"}
            id="totalExperience"
            placeholder="Total Experiance"
            helperText={
              isError("totalExperience", errors, touched)
                ? isErrorMessage("totalExperience", errors)
                : ""
            }
            error={isError("totalExperience", errors, touched)}
            {...getFieldProps("totalExperience")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="TeamLead Experience"
            type={"text"}
            id="teamLeadExperience"
            placeholder="TeamLead Experience"
            helperText={
              isError("teamLeadExperience", errors, touched)
                ? isErrorMessage("teamLeadExperience", errors)
                : ""
            }
            error={isError("teamLeadExperience", errors, touched)}
            {...getFieldProps("teamLeadExperience")}
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Company Contact Person"
            type={"text"}
            id="companyContactPerson"
            placeholder="Company Contact Person"
            helperText={
              isError("companyContactPerson", errors, touched)
                ? isErrorMessage("companyContactPerson", errors)
                : ""
            }
            error={isError("companyContactPerson", errors, touched)}
            {...getFieldProps("companyContactPerson")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="Notice Period"
            type={"text"}
            id="noticePeriod"
            placeholder="Notice Period"
            helperText={
              isError("noticePeriod", errors, touched)
                ? isErrorMessage("noticePeriod", errors)
                : ""
            }
            error={isError("noticePeriod", errors, touched)}
            {...getFieldProps("noticePeriod")}
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Current Salary (PKR)"
            type={"text"}
            id="currentSalary"
            placeholder="Current Salary (PKR)"
            helperText={
              isError("currentSalary", errors, touched)
                ? isErrorMessage("currentSalary", errors)
                : ""
            }
            error={isError("currentSalary", errors, touched)}
            {...getFieldProps("currentSalary")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="Expected Salary (PKR)"
            type={"text"}
            id="expectedSalary"
            placeholder="Expected Salary (PKR)"
            helperText={
              isError("expectedSalary", errors, touched)
                ? isErrorMessage("expectedSalary", errors)
                : ""
            }
            error={isError("expectedSalary", errors, touched)}
            {...getFieldProps("expectedSalary")}
          />
        </StyledInput>
      </StyledForm>
      <StyledLabel variant="h5">Reviews</StyledLabel>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="HR Score 0/10"
            type={"text"}
            id="hrScore"
            placeholder="HR Score 0/10"
            helperText={
              isError("hrScore", errors, touched)
                ? isErrorMessage("hrScore", errors)
                : ""
            }
            error={isError("hrScore", errors, touched)}
            {...getFieldProps("hrScore")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="Interviewer Score 0/10"
            type={"text"}
            id="technicalScore"
            placeholder="Interviewer Score 0/10"
            helperText={
              isError("technicalScore", errors, touched)
                ? isErrorMessage("technicalScore", errors)
                : ""
            }
            error={isError("technicalScore", errors, touched)}
            {...getFieldProps("technicalScore")}
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <CustomInput
          select
          label="Recomendation Status"
          id="recommendationStatus"
          placeholder="Recomendation Status"
          helperText={
            isError("recommendationStatus", errors, touched)
              ? isErrorMessage("recommendationStatus", errors)
              : ""
          }
          error={isError("recommendationStatus", errors, touched)}
          {...getFieldProps("recommendationStatus")}
          SelectProps={{
            native: true,
          }}
        >
          {RecomendTypes?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </CustomInput>
      </StyledForm>

      <StyledForm>
        <CustomInput
          label="HR Remarks"
          type={"text"}
          id="hrRemarks"
          placeholder="HR Remarks"
          helperText={
            isError("hrRemarks", errors, touched)
              ? isErrorMessage("hrRemarks", errors)
              : ""
          }
          error={isError("hrRemarks", errors, touched)}
          {...getFieldProps("hrRemarks")}
          multiline
          rows={3}
        />
      </StyledForm>

      <StyledForm>
        <CustomInput
          label="Interviewer Remarks"
          type={"text"}
          id="interviewerRemarks"
          placeholder="Interviewer Remarks"
          helperText={
            isError("interviewerRemarks", errors, touched)
              ? isErrorMessage("interviewerRemarks", errors)
              : ""
          }
          error={isError("interviewerRemarks", errors, touched)}
          {...getFieldProps("interviewerRemarks")}
          multiline
          rows={3}
        />
      </StyledForm>

      <Box display={"flex"} justifyContent={"flex-end"}>
        <CustomButton
          variant="outlined"
          onClick={() => navigate("/interviews")}
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
export default EmployementDetails;
