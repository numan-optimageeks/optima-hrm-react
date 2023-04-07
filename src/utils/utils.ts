import { FormikErrors, FormikTouched, getIn } from "formik";

export const isErrorMessage = (
  field: string,
  errors: FormikErrors<unknown>
): string => getIn(errors, field);

export const isError = (
  field: string,
  errros: FormikErrors<unknown>,
  touched: FormikTouched<unknown>
): boolean => getIn(touched, field) && Boolean(isErrorMessage(field, errros));
