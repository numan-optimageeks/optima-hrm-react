import { useNavigate } from "react-router";
import CustomButton from "../CustomButton/CustomButton";

interface IBackButton {
  path: string;
}

const BackButton: React.FC<IBackButton> = ({ path }) => {
  const navigate = useNavigate();
  return (
    <CustomButton
      variant="outlined"
      onClick={() => navigate(path)}
      sx={{ marginBottom: "20px" }}
    >
      Back
    </CustomButton>
  );
};
export default BackButton;
