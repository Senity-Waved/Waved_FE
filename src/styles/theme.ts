import { Theme } from '@emotion/react';
import color from '@/constants/color';

export const calcRem = (size: number) => `${size / 16}rem`;

const theme: Theme = {
  color: {
    primary: color.PRIMARY,
    positive: color.POSITIVE,
    negative: color.NEGATIVE,
  },
  spacing: {
    xxxs: calcRem(2),
    xxs: calcRem(4),
    xs: calcRem(8),
    sm: calcRem(12),
    base: calcRem(16),
    md: calcRem(20),
    lg: calcRem(24),
    xl: calcRem(32),
    xxl: calcRem(40),
    xxxl: calcRem(48),
    56: calcRem(56),
    60: calcRem(64),
  },
};

export default theme;
