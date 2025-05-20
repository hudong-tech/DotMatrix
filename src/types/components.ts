import { ReactNode } from 'react'

// 菜单组件Props
export interface MenuProps {
  activeMenu: string
  onMenuClick: (menu: string) => void
}

// 导航头部Props
export interface NavHeaderProps {
  title: string
  time: string
  isDarkTheme: boolean
  onThemeChange: (isDark: boolean) => void
}

// 可以添加其他组件Props类型，暂时只有这两个组件明确需要类型定义
