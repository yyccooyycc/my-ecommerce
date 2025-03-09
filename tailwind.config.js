/** @type {import('tailwindcss').Config} */
import { colors as _colors, fontFamily as _fontFamily, spacing as _spacing } from './src/assets/styles/theme.js';

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    colors: _colors,
    fontFamily: _fontFamily,
    spacing: _spacing,
  },
};
export const plugins = [];

