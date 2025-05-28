# DotMatrix 设计系统文档

DotMatrix 使用了一个结构化的设计 token 系统，以 Tailwind CSS + CSS Modules 的混合方案实现，确保了整体 UI 的一致性和可维护性。本文档详细说明了设计系统的各个组成部分。

src/theme/
├── tokens.ts # 基础设计变量定义
├── colors.ts # 颜色系统
├── typography.ts # 文字系统
├── spacing.ts # 间距系统
├── effects.ts # 特效系统(如 CRT 效果)
└── index.ts # 导出统一接口

当前的设计 token 系统包含了：
颜色系统：已正确定义了浅色和深色两套主题的所有必要颜色
排版系统：包含了字体、字号、行高和字间距的定义
间距系统：提供了一套基于 rem 的标准化间距
特效系统：包含了 CRT 效果、过渡动画和其他视觉特效
API 接口：提供了 CSS 变量生成和 Tailwind 配置扩展功能

## 1. 颜色系统

颜色系统基于复古终端风格设计，提供了浅色和深色两套主题。

### 浅色主题

````typescript //
bordere',e0e0', // 边框       // 边框 组n
pan: '#elBg: '#ffff  // 面',      // 面activem'#008Bg: '#008活000', // 活veItemColor
activeItemColor '#ffffff', //'#f5g: '#f55f5',  // 导航        // 导航
header '#f5f5' // 头      // 头### 深色主题（CRT风格）

```typescript
// 基础颜色
mainBg: '#000000',       // 主背景色
mainText: '#33ff33',     // 主文本颜色（亮绿色）
secondary: '#33ff33',    // 次要强调色
warning: '#ffff33',      // 警告色（黄色）
error: '#ff3333',        // 错误色（红色）
border: '#33ff33',       // 边框颜色

// 组件颜色
panelBg: 'rgba(0, 0, 0, 0.8)', // 面板背景色
activeItemBg: '#33ff33', // 活动项背景色
activeItemColor: '#000000', // 活动项文本色
navBg: '#000000',        // 导航背景色
headerBg: '#000000'      // 头部背景色
````

## 2. 排版系统

系统使用了复古终端风格的字体，为不同元素设置了统一的字体规范。

```typescript
fonts: {
  terminal: "'VT323', monospace",      // 终端风格字体
  heading: "'Press Start 2P', cursive"  // 标题字体
},
fontSizes: {
  base: '16px',           // 基础字体大小
  small: '0.8rem',        // 小号字体
  medium: '0.9rem',       // 中号字体
  large: '1rem',          // 大号字体
  xl: '1.2rem',           // 特大字体
  xxl: '1.5rem',          // 超大字体
  xxxl: '1.8rem'          // 最大字体
},
lineHeights: {
  normal: '1.4'           // 基础行高
},
letterSpacings: {
  normal: '0',            // 正常字间距
  wide: '1px',            // 宽字间距
  wider: '2px'            // 最宽字间距
}
```

## 3. 间距系统

使用基于 rem 的标准化间距，确保界面元素间距的一致性。

```typescript
0: '0',                 // 无间距
0.25: '0.25rem',        // 4px
0.5: '0.5rem',          // 8px
0.75: '0.75rem',        // 12px
1: '1rem',              // 16px
1.5: '1.5rem',          // 24px
2: '2rem',              // 32px
2.5: '2.5rem',          // 40px
3: '3rem',              // 48px

// 特定组件尺寸
sidebar: '250px'        // 侧边栏宽度
```

## 4. 特效系统

包含各种动画和视觉效果，特别是 CRT 显示器风格的效果，增强复古感。

### 过渡效果

```typescript
transitions: {
  default: 'all 0.3s ease',  // 默认过渡
  fast: 'all 0.2s'           // 快速过渡
}
```

### 动画

```typescript
animations: {
  flicker: {                  // CRT闪烁效果
    keyframes: `...`,         // 详细动画帧
    duration: '8s infinite'   // 持续时间
  },
  blink: {                    // 光标闪烁
    keyframes: `...`,         // 详细动画帧
    duration: '1s steps(2, start) infinite' // 持续时间
  },
  type: {                     // 打字效果
    keyframes: `...`,         // 详细动画帧
    duration: '1.5s steps(30, end) forwards' // 持续时间
  }
}
```

### CRT 特效

```typescript
crtEffects: {
  scanlines: `...`,           // 扫描线效果
  vignette: `...`             // 边缘渐变效果
}
```

## 5. 使用方式

### CSS 变量生成

设计系统提供了一个函数，可以根据当前主题生成对应的 CSS 变量：

```typescript
generateCSSVariables(theme: 'light' | 'dark')
```

这将返回一个对象，包含所有 CSS 变量的映射，可以直接应用于元素样式。

### Tailwind 配置

设计系统还提供了 Tailwind 主题配置，可以在 tailwind.config.ts 中使用：

```typescript
import { tailwindTheme } from '@/theme'

export default {
  // ...其他配置
  theme: {
    extend: tailwindTheme
  }
}
```

## 6. 组件示例

### 按钮样式

```jsx
<button className="px-3 py-2 bg-primary text-white hover:bg-secondary font-terminal">
  标准按钮
</button>

<button className="px-2 py-1 text-xs bg-primary text-white hover:bg-secondary font-terminal">
  小型按钮
</button>

<button className="px-3 py-2 bg-error text-white hover:bg-[#cc0000] font-terminal">
  危险按钮
</button>
```

### 面板样式

```jsx
<div className='border border-dotted border-[var(--border-color)] bg-[var(--panel-bg-color)] p-4 mb-4'>
  <div className='border-b-2 border-dotted border-[var(--border-color)] pb-2 mb-2 font-terminal text-base flex justify-between items-center'>
    面板标题
  </div>
  面板内容
</div>
```

## 7. 主题切换

系统支持明暗两种主题切换，通过设置`data-theme`属性实现：

```typescript
// 切换到深色主题
document.body.setAttribute('data-theme', 'dark')

// 切换到浅色主题
document.body.setAttribute('data-theme', 'light')
```

## 8. 响应式设计

系统包含了基础的响应式设计支持，以适应不同尺寸的屏幕：

- 移动设备: 小于 768px
- 平板设备: 768px - 1024px
- 桌面设备: 大于 1024px

在移动设备上，侧边栏会变为全宽的顶部导航，内容区域会调整间距和布局。
