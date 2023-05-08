import { AxiosError } from "axios";

export interface APIError {
  error?: string;
  message: string;
  code: number;
}

const InternalError = {
  error: "Internal Error",
  message: "Something went wrong!. Please try again later!",
  code: 500,
};

export const transformError = (error: unknown): APIError => {
  if (typeof error !== "object" || !error) {
    return InternalError;
  }

  if (
    error instanceof AxiosError &&
    "response" in error &&
    (typeof error.response?.data?.message === "string" ||
      Array.isArray(error.response?.data?.message))
  ) {
    const msg = error.response?.data?.message;
    return {
      message: Array.isArray(msg) ? msg[0] : msg,
      code: error.response?.data?.statusCode,
      error: error.response?.data?.error,
    };
  }

  if (error instanceof Error && typeof error?.message === "string") {
    return {
      message: error?.message,
      code: 500,
      error: "error",
    };
  }
  return InternalError;
};
