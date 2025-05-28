import { lightColors, darkColors, ThemeColors } from './colors'
import { typography, Typography } from './typography'
import { spacing, Spacing } from './spacing'
import { effects, Effects } from './effects'

export interface ThemeTokens {
  colors: ThemeColors
  typography: Typography
  spacing: Spacing
  effects: Effects
}

export const lightTheme: ThemeTokens = {
  colors: lightColors,
  typography,
  spacing,
  effects
}

export const darkTheme: ThemeTokens = {
  colors: darkColors,
  typography,
  spacing,
  effects
}
