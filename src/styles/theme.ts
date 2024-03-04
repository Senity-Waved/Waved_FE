import { Theme } from '@emotion/react';
import color from '@/constants/color';

export const calcRem = (size: number) => `${size / 16}rem`;

const theme: Theme = {
  color: {
    normal: color.NORMAL,
    light: color.LIGHT,
    middle: color.MIDDLE,
    dark: color.DARK,
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
    headline1: '700',
    headline2: '600',
    subtitle1: '600',
    subtitle2: '500',
    body1: '600',
    body2: '500',
    body3: '600',
    body4: '500',
    caption1: '600',
    caption2: '500',
    caption3: '400',
  },
  fontSize: {
    headline1: '1.5rem',
    headline2: '1.25rem',
    subtitle1: '1.125rem',
    subtitle2: '1.125rem',
    body1: '1rem',
    body2: '1rem',
    body3: '.875rem',
    body4: '.875rem',
    caption1: '.75rem',
    caption2: '.75rem',
    caption3: '10px',
  },
};

export default theme;
