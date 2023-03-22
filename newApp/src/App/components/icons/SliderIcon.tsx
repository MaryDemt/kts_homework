import React from "react";

interface Props {
  step: number;
  handleClick: Function;
  nameOfClass: string;
}

export const SliderIcon = ({ nameOfClass, step, handleClick }: Props) => (
  <svg
    onClick={() => handleClick(step)}
    className={nameOfClass}
    viewBox="0 0 13 24"
    xmlns="http://www.w3.org/2000/svg"
    strokeWidth="3"
    strokeMiterlimit="10"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1.95703 21.6128L10.0439 13.526C10.9989 12.571 10.9989 11.0082 10.0439 10.0531L1.95703 1.96631" />
  </svg>
);
