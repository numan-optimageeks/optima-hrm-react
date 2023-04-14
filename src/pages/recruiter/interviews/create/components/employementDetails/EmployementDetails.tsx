import { useLocation, useNavigate } from "react-router";
import { StyledLabel } from "./EmployementDetails.style";
import { useAxios } from "src/hooks/useAxios";
import { IInterview } from "../../data/interface";
import { useEffect, useState } from "react";
import { initialValues } from "../../data/initialValues";

const EmployementDetails = () => {
  const navigate = useNavigate();
  const AxiosClient = useAxios();
  const location = useLocation();
  const editState: IInterview = location?.state;
  const [details, setDetails] = useState([]);
  const [initialValue, setInitialValue] = useState({
    ...initialValues(),
  });

  return (
    <form onSubmit={() => {}} autoComplete="off">
      <StyledLabel variant="h5">Employement Details</StyledLabel>
    </form>
  );
};
export default EmployementDetails;
