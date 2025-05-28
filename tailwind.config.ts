/**
 * Tailwind CSS 配置文件
 *
 * 该文件定义了项目的Tailwind配置，集成了设计token系统
 * 主要功能：
 * 1. 整合设计tokens到Tailwind主题中
 * 2. 配置内容扫描范围
 * 3. 禁用不需要的预设样式
 * 4. 支持暗色模式
 */

import { lightTheme } from './src/theme/tokens'
import type { Config } from 'tailwindcss'

const config = {
  // 指定Tailwind应扫描的文件，用于生成最终的CSS
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],

  // 禁用预设样式以避免与原型CSS冲突
  corePlugins: {
    preflight: false // 禁用Tailwind的CSS重置，保持原型样式
  },

  // 启用暗色模式支持，使用class策略
  darkMode: 'class',

  // 主题配置 - 集成设计tokens
  theme: {
    extend: {
      // 颜色系统 - 基于设计tokens，确保整个应用颜色一致性
      colors: {
        // 主要颜色 - 用于文本和主要UI元素
        primary: lightTheme.colors.mainText,
        secondary: lightTheme.colors.secondary,

        // 状态颜色 - 用于反馈和状态指示
        warning: lightTheme.colors.warning,
        error: lightTheme.colors.error,
        success: lightTheme.colors.success,

        // 布局颜色 - 用于边框、面板等结构元素
        border: lightTheme.colors.border,
        panel: lightTheme.colors.panelBg,
        nav: lightTheme.colors.navBg,
        header: lightTheme.colors.headerBg
      },

      // 字体系统 - 基于设计tokens，保持字体一致性
      fontFamily: {
        terminal: lightTheme.typography.fonts.terminal.split(','),
        heading: lightTheme.typography.fonts.heading.split(',')
      },

      // 组件状态样式 - 用于交互状态的视觉反馈
      backgroundColor: {
        active: lightTheme.colors.activeItemBg // 活动状态背景色
      },
      textColor: {
        active: lightTheme.colors.activeItemColor // 活动状态文字色
      },

      // 间距系统 - 基于设计tokens，确保布局一致性
      spacing: lightTheme.spacing,

      // 过渡动画配置 - 基于设计tokens，提供统一的动画体验
      transitionProperty: {
        default: 'all' // 默认对所有可动画属性应用过渡
      },
      transitionTimingFunction: {
        // 缓动函数 - 控制动画的速度曲线
        default: lightTheme.effects.timingFunctions.default, // ease: 先快后慢，自然感
        linear: lightTheme.effects.timingFunctions.linear, // 匀速运动
        easeIn: lightTheme.effects.timingFunctions.easeIn, // 渐入：越来越快
        easeOut: lightTheme.effects.timingFunctions.easeOut // 渐出：越来越慢
      },
      transitionDuration: {
        // 过渡持续时间 - 控制动画的时长
        default: lightTheme.effects.durations.default, // 300ms: 标准交互反馈时间
        fast: lightTheme.effects.durations.fast, // 200ms: 快速反馈，如hover
        slow: lightTheme.effects.durations.slow // 500ms: 重要状态变化
      }
    }
  },

  plugins: []
} as const

export default config
