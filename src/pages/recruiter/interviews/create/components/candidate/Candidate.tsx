import { useLocation } from "react-router";
import { IInterview } from "../../data/interface";
import { StyledForm, StyledInput } from "./Candidate.style";
import CustomInput from "src/components/CustomInput/CustomInput";

const Candidate = () => {
  const location = useLocation();
  const editState: IInterview = location?.state;
  console.log("editState", editState);
  return (
    <>
      <StyledForm>
        <StyledInput>
          <CustomInput label="Full Name" value={editState?.fullName} disabled />
        </StyledInput>
        <StyledInput>
          <CustomInput label="E-mail" value={editState?.email} disabled />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput
            label="Phone Number"
            value={editState?.phoneNumber}
            disabled
          />
        </StyledInput>
        <StyledInput>
          <CustomInput label="CNIC" value={editState?.cnic} disabled />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput label="Gender" value={editState?.gender} disabled />
        </StyledInput>
        <StyledInput>
          <CustomInput label="Age" value={editState?.age} disabled />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <CustomInput label="Education" disabled value={editState?.education} />
      </StyledForm>

      <StyledForm>
        <StyledInput>
          <CustomInput label="State" value={editState?.state} disabled />
        </StyledInput>
        <StyledInput>
          <CustomInput label="City" value={editState?.city} disabled />
        </StyledInput>
      </StyledForm>

      <StyledForm>
        <CustomInput
          label="Address"
          disabled
          value={editState?.address}
          multiline
          rows={2}
        />
      </StyledForm>
    </>
  );
};
export default Candidate;
