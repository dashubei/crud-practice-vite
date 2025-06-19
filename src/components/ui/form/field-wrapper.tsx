import React from "react";
import type { FieldError } from "react-hook-form";
import Error from "./error";

type FieldWrapperProps = {
  label?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

const FieldWrapper = ({
  label,
  error,
  children,
}: FieldWrapperProps): React.JSX.Element => {
  return (
    <>
      <label className="is-flex is-align-items-center ">
        {label}
        <div>{children}</div>
      </label>
      <Error errorMessage={error?.message} />
    </>
  );
};

export default FieldWrapper;
