import React, { memo } from 'react';
import { RadioWrapper } from './CustomRaio.styled';

const CustomRadio = ({ lable, ...restProps }) => (
  <RadioWrapper htmlFor={restProps.id}>
    {lable}
    <input {...restProps} type="radio" />
    <span />
  </RadioWrapper>
);
export default memo(CustomRadio);
