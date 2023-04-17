import { useLocation, useNavigate } from "react-router";
import { useAxios } from "src/hooks/useAxios";
import { IEmployee } from "../../data/interface";
import { useEffect, useState } from "react";
import { initialValues, validations } from "../../data/initialValues";
import { CreateEmployee } from "../../data/initialValues";
import { useFormik } from "formik";
import { StyledForm, StyledInput } from "./CreateForm.style";
import CustomInput from "src/components/CustomInput/CustomInput";
import { isError, isErrorMessage } from "src/utils/utils";
import { GenderTypes, WorkTypes } from "../../data/constants";
import states from "../../data/states.json";
import InputMask from "react-input-mask";
import { Box } from "@mui/material";
import CustomButton from "src/components/CustomButton/CustomButton";
import { useToast } from "src/hooks/useToast";
import { transformError } from "src/helpers/transformError";

const CreateForm = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const location = useLocation();
  const toast = useToast();
  const editState: IEmployee = location?.state;
  const [details, setDetails] = useState([]);
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });
  useEffect(() => {
    if (editState?.id) {
      const editValues = {
        address: editState?.address || "",
        city: editState?.city || "",
        cnic: editState?.cnic || "",
        companyEmail: editState?.companyEmail || "",
        contactDetail: editState?.contactDetail || "",
        dateOfBirth: editState?.dateOfBirth || "",
        departmentId: editState?.departmentId || "",
        designationId: editState?.designationId || "",
        email: editState?.email || "",
        employeeId: editState?.employeeId || "",
        fullName: editState?.fullName || "",
        gender: editState?.gender || "",
        joiningDate: editState?.joiningDate || "",
        managerId: editState?.managerId || "",
        state: editState?.state || "",
        workType: editState?.workType || "",
      };
      setInitialValue(editValues);
    }
  }, [editState]);

  const handleFormSubmit = async (values: CreateEmployee) => {
    try {
      const payload = {
        address: values?.address || "",
        city: values?.city || "",
        cnic: values?.cnic || "",
        companyEmail: values?.companyEmail || "",
        contactDetail: values?.contactDetail || "",
        dateOfBirth: values?.dateOfBirth || "",
        departmentId: Number(values?.departmentId) || null,
        designationId: Number(values?.designationId) || null,
        email: values?.email || "",
        employeeId: values?.employeeId || "",
        fullName: values?.fullName || "",
        gender: values?.gender || "",
        joiningDate: values?.joiningDate || "",
        managerId: Number(values?.managerId) || null,
        state: values?.state || "",
        workType: values?.workType || "",
      };
      if (editState?.id) {
        await AxiosClient.put(`/employee/update/${editState?.id}`, payload);
      } else {
        await AxiosClient.post(`/employee/create`, payload);
      }
      navigate("/employees");
    } catch (err) {
      toast.error(transformError(err)?.message);
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
  useEffect(() => {
    const getDetails = async () => {
      try {
        const idRes = await AxiosClient.get(`/employee/findLatest`);
        const key = idRes?.data?.data?.employee_id?.split("_")[1];
        if (Number(key) < 10) {
          setFieldValue("employeeId", `OG_0${Number(key) + 1}`);
        } else if (Number(key) > 10) {
          setFieldValue("employeeId", `OG_${Number(key) + 1}`);
        }
        const res = await AxiosClient.post(`/shared/details`);
        setDetails(res?.data?.data);
      } catch (err) {
        toast.error(transformError(err)?.message);
      }
    };
    if (!editState?.id) {
      getDetails();
    }
  }, []);
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
  const getDepartments = () => {
    const departments = details[0]?.data?.map((item) => {
      return {
        label: item?.department,
        value: item?.id,
      };
    });
    return [
      {
        label: "",
        value: "",
      },
      ...(departments || []),
    ];
  };
  const getDesignations = () => {
    const designations = details[1]?.data?.map((item) => {
      return {
        label: item?.designation,
        value: item?.id,
      };
    });
    return [
      {
        label: "",
        value: "",
      },
      ...(designations || []),
    ];
  };
  const getEmployees = () => {
    const employees = details[2]?.data?.map((item) => {
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
      ...(employees || []),
    ];
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Employee Id"
            type={"text"}
            id="employeeId"
            placeholder="Employee Id"
            helperText={
              isError("employeeId", errors, touched)
                ? isErrorMessage("employeeId", errors)
                : ""
            }
            error={isError("employeeId", errors, touched)}
            {...getFieldProps("employeeId")}
            disabled
          />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Full name"
            type={"text"}
            id="fullName"
            placeholder="Full name"
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
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Personal E-mail"
            type={"text"}
            id="email"
            placeholder="Personal E-mail"
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
          <InputMask
            mask="+99 999 999 9999"
            maskplaceholder=""
            alwaysShowMask={false}
            {...getFieldProps("contactDetail")}
          >
            {(inputProps) => (
              <CustomInput
                label="Phone Number"
                type={"text"}
                id="contactDetail"
                placeholder="Phone Number"
                helperText={
                  isError("contactDetail", errors, touched)
                    ? isErrorMessage("contactDetail", errors)
                    : ""
                }
                error={isError("contactDetail", errors, touched)}
                {...inputProps}
              />
            )}
          </InputMask>
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Company E-mail"
            type={"text"}
            id="companyEmail"
            placeholder="Company E-mail"
            helperText={
              isError("companyEmail", errors, touched)
                ? isErrorMessage("companyEmail", errors)
                : ""
            }
            error={isError("companyEmail", errors, touched)}
            {...getFieldProps("companyEmail")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            select
            label="Work Type"
            id="workType"
            placeholder="Work Type"
            helperText={
              isError("workType", errors, touched)
                ? isErrorMessage("workType", errors)
                : ""
            }
            error={isError("workType", errors, touched)}
            {...getFieldProps("workType")}
            SelectProps={{
              native: true,
            }}
          >
            {WorkTypes?.map((option) => (
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
            label="Date of Birth"
            type={"date"}
            id="dateOfBirth"
            helperText={
              isError("dateOfBirth", errors, touched)
                ? isErrorMessage("dateOfBirth", errors)
                : ""
            }
            error={isError("dateOfBirth", errors, touched)}
            {...getFieldProps("dateOfBirth")}
          />
        </StyledInput>
        <StyledInput>
          <CustomInput
            label="Joining Date"
            type={"date"}
            id="joiningDate"
            helperText={
              isError("joiningDate", errors, touched)
                ? isErrorMessage("joiningDate", errors)
                : ""
            }
            error={isError("joiningDate", errors, touched)}
            {...getFieldProps("joiningDate")}
          />
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
            select
            label="Line Manager"
            id="managerId"
            placeholder="Line Manager"
            helperText={
              isError("managerId", errors, touched)
                ? isErrorMessage("managerId", errors)
                : ""
            }
            error={isError("managerId", errors, touched)}
            {...getFieldProps("managerId")}
            SelectProps={{
              native: true,
            }}
          >
            {getEmployees()?.map((option) => (
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
            label="Department"
            id="departmentId"
            placeholder="Department"
            helperText={
              isError("departmentId", errors, touched)
                ? isErrorMessage("departmentId", errors)
                : ""
            }
            error={isError("departmentId", errors, touched)}
            {...getFieldProps("departmentId")}
            SelectProps={{
              native: true,
            }}
          >
            {getDepartments()?.map((option) => (
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
            id="designationId"
            placeholder="Designation"
            helperText={
              isError("designationId", errors, touched)
                ? isErrorMessage("designationId", errors)
                : ""
            }
            error={isError("designationId", errors, touched)}
            {...getFieldProps("designationId")}
            SelectProps={{
              native: true,
            }}
          >
            {getDesignations()?.map((option) => (
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
        <CustomButton variant="outlined" onClick={() => navigate("/employees")}>
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
