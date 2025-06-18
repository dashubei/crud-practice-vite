import type { FieldError } from "react-hook-form";
import FieldWrapper from "./field-wrapper";

type InputProps = {
  type: "text" | "password" | "number" | "submit";
  label?: string;
  error: FieldError | undefined;
};
const Input = ({ type, label, error }: InputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input type={type} />
    </FieldWrapper>
  );
};

export default Input;
