import { Theme } from '@emotion/react';
import color from '@/constants/color';

export const calcRem = (size: number) => `${size / 16}rem`;

const theme: Theme = {
  color: {
    normal: color.NORMAL,
    light: color.LIGHT,
    middle: color.MIDDLE,
    positive: color.POSITIVE,
    error: color.ERROR,
    black: color.BLACK,
    white: color.WHITE,
    gray_f9: color.GRAYF9,
    gray_ec: color.GRAYEC,
    gray_de: color.GRAYDE,
    gray_bf: color.GRAYBF,
    gray_99: color.GRAY99,
    gray_83: color.GRAY83,
    gray_70: color.GRAY70,
    gray_52: color.GRAY52,
    gray_3c: color.GRAY3C,
    gray_1f: color.GRAY1F,
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
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

export default theme;
