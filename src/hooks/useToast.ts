import { useMemo } from "react";
import { toast, ToastOptions } from "react-hot-toast";

export const useToast = () => {
  return useMemo(
    () => ({
      success: (message: string, toastOptions?: ToastOptions) => {
        toast.dismiss();
        return toast.success(message, {
          ...toastOptions,
        });
      },
      error: (message: string, toastOptions?: ToastOptions) => {
        toast.dismiss();
        return toast.error(message, {
          ...toastOptions,
        });
      },
      dismiss: () => toast.dismiss(),
    }),
    []
  );
};
