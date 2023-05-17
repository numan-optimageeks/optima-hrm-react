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
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";
import Loader from "src/components/Loader/Loader";

const EmploymentDetails = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const location = useLocation();
  const toast = useToast();
  //@ts-ignore
  const editState: ICreateInterview = location?.state?.interview;
  //@ts-ignore
  const applicant: any = location?.state?.candidate;
  const [details, setDetails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
    applicantId: applicant.id,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getEmployeesPositions = async () => {
      setLoading(true);
      try {
        const res = await Promise.all([
          AxiosClient.post(`/employee/`),
          AxiosClient.post("/job-position/", { status: "open" }),
        ]);
        const employees = res[0]?.data?.data;
        const positions = res[1]?.data?.data;
        setEmployees(employees);
        setPositions(positions);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
      setLoading(false);
    };
    getEmployeesPositions();
  }, []);

  useEffect(() => {
    const getDate = () => {
      const date = new Date();
      return `${format(date, "yyyy-MM-dd")}T${format(date, "HH:mm")}`;
    };
    //@ts-ignore
    if (editState?.id) {
      const editValues = {
        interviewerId: editState?.interviewerId || undefined,
        interviewerName: editState?.interviewerName || "",
        status: editState?.status || "",
        interviewTimings: editState?.interviewTimings || getDate(),
        appliedFor: editState?.appliedFor || undefined,
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
        reasonOfLeaving: editState?.reasonOfLeaving || "",
        teamHeadCount: editState?.teamHeadCount || 0,
      };
      setInitialValue(editValues);
    }
  }, [editState]);

  const handleFormSubmit = async (values: ICreateInterview) => {
    setLoading(true);
    try {
      const payload = {
        interviewerId: values?.interviewerId || null,
        interviewerName: values?.interviewerName || "",
        status: values?.status || "",
        interviewTimings: values?.interviewTimings || "",
        appliedFor: +values?.appliedFor || undefined,
        currentCompany: values?.currentCompany || "",
        currentCompanyExperience: values?.currentCompanyExperience || "",
        teamLeadExperience: values?.teamLeadExperience || "",
        totalExperience: values?.totalExperience || "",
        applicantId: values?.applicantId || "",
        companyContactPerson: values?.companyContactPerson || "",
        currentSalary: values?.currentSalary || "",
        expectedSalary: values?.expectedSalary || "",
        noticePeriod: values?.noticePeriod || "",
        hrScore: values?.hrScore || "",
        technicalScore: values?.technicalScore || "",
        hrRemarks: values?.hrRemarks || "",
        interviewerRemarks: values?.interviewerRemarks || "",
        recommendationStatus: values?.recommendationStatus || "",
        reasonOfLeaving: values?.reasonOfLeaving || "",
        teamHeadCount: values?.teamHeadCount || 0,
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
      console.log(err);
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
      {loading && <Loader />}
      <StyledLabel variant="h5">Employement Details</StyledLabel>
      <StyledForm>
        <StyledInput>
          <CustomInput
            select
            label="Interviewer"
            id="interviewerId"
            placeholder="Interviewer"
            helperText={
              isError("interviewerId", errors, touched)
                ? isErrorMessage("interviewerId", errors)
                : ""
            }
            error={isError("interviewerId", errors, touched)}
            {...getFieldProps("interviewerId")}
            SelectProps={{
              native: true,
            }}
            onChange={(e) => {
              const value = getInterviewer()?.find(
                (val) => val?.value === +e?.target?.value
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
            type="datetime-local"
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
            select
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
            SelectProps={{
              native: true,
            }}
          >
            <option value=""></option>
            {positions?.map((position) => (
              <option key={position.id} value={position.id}>
                {position.position}
              </option>
            ))}
          </CustomInput>
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
            label="Team Lead Experience"
            type={"text"}
            id="teamLeadExperience"
            placeholder="Team Lead Experience"
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
            label="Team Head Count"
            type="text"
            id="teamHeadCount"
            placeholder="Team Head Count"
            helperText={
              isError("teamHeadCount", errors, touched)
                ? isErrorMessage("teamHeadCount", errors)
                : ""
            }
            error={isError("teamHeadCount", errors, touched)}
            {...getFieldProps("teamHeadCount")}
          />
        </StyledInput>
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
      </StyledForm>
      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Notice Period"
            type="text"
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
        <StyledInput>
          <CustomInput
            label="Reason of Leaving"
            type="text"
            id="reasonOfLeaving"
            placeholder="Reason of Leaving"
            helperText={
              isError("reasonOfLeaving", errors, touched)
                ? isErrorMessage("reasonOfLeaving", errors)
                : ""
            }
            error={isError("reasonOfLeaving", errors, touched)}
            {...getFieldProps("reasonOfLeaving")}
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
          {/* @ts-ignore */}
          {editState?.id ? "Save" : "Create"}
        </CustomButton>
      </Box>
    </form>
  );
};
export default EmploymentDetails;
