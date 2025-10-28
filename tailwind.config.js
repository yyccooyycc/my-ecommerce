/** @type {import('tailwindcss').Config} */
import {
  colors as _colors,
  fontFamily as _fontFamily,
  spacing as _spacing,
  fontSize as _fontSize,
  borderRadius as _borderRadius,
  extend as _extend,
} from './src/assets/styles/theme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: _colors,
    fontFamily: _fontFamily,
    spacing: _spacing,
    fontSize: _fontSize,
    borderRadius: _borderRadius,
    screens: _extend?.screens,
  },
};
export const plugins = [];
