import type { FieldError } from "react-hook-form";
import FieldWrapper from "./field-wrapper";

type InputProps = {
  type: "text" | "password" | "number" | "submit";
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: FieldError | undefined;
};
const Input = ({ type, label, onChange, error }: InputProps) => {
  return (
    <FieldWrapper label={label} error={error}>
      <input className="input is-primary" onChange={onChange} type={type} />
    </FieldWrapper>
  );
};

export default Input;
