export * from './tokens'
export * from './colors'
export * from './typography'
export * from './spacing'
export * from './effects'

// CSS变量生成工具
export const generateCSSVariables = (theme: 'light' | 'dark') => {
  const tokens = theme === 'light' ? lightTheme : darkTheme

  return {
    // 颜色变量
    '--main-bg-color': tokens.colors.mainBg,
    '--main-text-color': tokens.colors.mainText,
    '--secondary-color': tokens.colors.secondary,
    '--warning-color': tokens.colors.warning,
    '--error-color': tokens.colors.error,
    '--border-color': tokens.colors.border,
    '--panel-bg-color': tokens.colors.panelBg,
    '--active-item-bg': tokens.colors.activeItemBg,
    '--active-item-color': tokens.colors.activeItemColor,
    '--nav-bg-color': tokens.colors.navBg,
    '--header-bg-color': tokens.colors.headerBg,

    // 字体变量
    '--terminal-font': tokens.typography.fonts.terminal,
    '--heading-font': tokens.typography.fonts.heading
  }
}

// 导出方便Tailwind配置使用的对象
export const tailwindTheme = {
  colors: {
    primary: lightTheme.colors.mainText,
    secondary: lightTheme.colors.secondary,
    warning: lightTheme.colors.warning,
    error: lightTheme.colors.error,
    success: lightTheme.colors.success,
    border: lightTheme.colors.border,
    panel: lightTheme.colors.panelBg,
    nav: lightTheme.colors.navBg,
    header: lightTheme.colors.headerBg
  },
  fontFamily: {
    terminal: lightTheme.typography.fonts.terminal.split(','),
    heading: lightTheme.typography.fonts.heading.split(',')
  },
  extend: {
    backgroundColor: {
      active: lightTheme.colors.activeItemBg
    },
    textColor: {
      active: lightTheme.colors.activeItemColor
    }
  }
}

import { lightTheme, darkTheme } from './tokens'
