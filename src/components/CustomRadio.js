/* eslint-disable arrow-body-style */
import React from 'react';
import { RadioWrapper } from './CustomRaio.styled';

const CustomRadio = ({ lable, ...restProps }) => {
  return (
    <RadioWrapper htmlFor={restProps.id}>
      {lable}
      <input {...restProps} type="radio" />
      <span />
    </RadioWrapper>
  );
};

export default CustomRadio;
