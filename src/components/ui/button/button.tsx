import React from "react";

type ButtonProps = {
  text: string;
  className: string;
  type: "submit" | "button";
  onClick?: () => void;
};
const Button = ({
  text,
  className,
  type,
  onClick,
}: ButtonProps): React.JSX.Element => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
