export interface IUpdateProfile {
  image: string;
  name: string;
}

export const UpdateProfileInitialValues = (): IUpdateProfile => {
  return {
    image: "",
    name: "",
  };
};
