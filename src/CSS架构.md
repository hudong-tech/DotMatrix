# DotMatrix CSS 架构设计

## 架构概述

本项目采用 **Tailwind CSS + CSS Modules** 的现代化混合方案，结合 TypeScript 设计 token 系统，实现高效、可维护的样式管理。

## 核心原则

### 1. 单一数据源

- 所有设计变量由 TypeScript tokens 管理
- 避免重复定义和不一致性
- 类型安全的设计系统

### 2. 分层架构

TypeScript Tokens (数据层)
↓
Tailwind Config (工具层)
↓
CSS Modules + Tailwind Classes (组件层)

### 3. 职责分离

- **Tailwind**: 通用工具类、布局、间距
- **CSS Modules**: 复杂组件样式、动画、特殊效果
- **Tokens**: 设计变量的统一管理

## 文件结构

src/
├── theme/ # 设计系统
│ ├── tokens.ts # 主要 tokens 导出
│ ├── colors.ts # 颜色系统
│ ├── typography.ts # 字体系统
│ ├── spacing.ts # 间距系统
│ ├── effects.ts # 动画效果
│ └── index.ts # 统一导出
├── components/ # 组件库
│ ├── Button/
│ │ ├── index.tsx # React 组件
│ │ ├── index.module.less # CSS Modules 样式
│ │ └── Button.stories.tsx # Storybook 文档
│ ├── Panel/
│ │ ├── index.tsx
│ │ └── index.module.less
│ └── ...
├── utils/
│ └── cn.ts # className 合并工具
└── tailwind.config.ts # Tailwind 配置

## 使用指南

### 1. Tailwind 工具类优先

对于简单的样式，优先使用 Tailwind 工具类：

```tsx
// ✅ 推荐：使用Tailwind工具类
<div className='flex items-center justify-between p-4 bg-panel border border-border rounded'>
  <span className='text-primary font-terminal'>标题</span>
  <button className='px-3 py-1 bg-primary text-white hover:bg-opacity-80 transition-default'>按钮</button>
</div>
```

### 2. CSS Modules 处理复杂样式

对于复杂的组件样式，使用 CSS Modules：

```less
// src/components/Terminal/index.module.less
.terminal {
  background: theme('colors.panel');
  border: 2px solid theme('colors.border');
  font-family: theme('fontFamily.terminal');

  // 复杂的CRT效果
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%);
    background-size: 100% 2px;
    pointer-events: none;
  }

  // 闪烁动画
  &.flickering {
    animation: flicker theme('transitionDuration.slow') infinite;
  }
}

@keyframes flicker {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.95;
  }
}
```

### 3. 混合使用最佳实践

```tsx
// src/components/Terminal/index.tsx
import { cn } from '@/utils/cn'
import styles from './index.module.less'

interface TerminalProps {
  variant?: 'default' | 'retro'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Terminal = ({ variant = 'default', size = 'md', className, ...props }) => {
  return (
    <div
      className={cn(
        // Tailwind基础样式
        'relative overflow-hidden',

        // CSS Modules复杂样式
        styles.terminal,

        // 条件样式
        {
          [styles.flickering]: variant === 'retro',
          'text-sm p-2': size === 'sm',
          'text-base p-4': size === 'md',
          'text-lg p-6': size === 'lg'
        },

        // 外部样式
        className
      )}
      {...props}
    />
  )
}
```

## 主题系统

### 1. 主题切换

```tsx
// 主题切换组件
const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <button onClick={toggleTheme} className='theme-toggle'>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
```

### 2. 响应式设计

```tsx
// 响应式组件
<div className={cn('grid gap-4', 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3', 'p-4 md:p-6 lg:p-8')}>{/* 内容 */}</div>
```

## 组件开发规范

### 1. 组件结构

```tsx
// 标准组件模板
interface ComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export const Component = ({ variant = 'primary', size = 'md', disabled = false, className, children, ...props }) => {
  return (
    <div
      className={cn(
        // 基础样式
        'component-base',

        // CSS Modules
        styles.component,

        // 变体样式
        styles[variant],

        // 状态样式
        {
          [styles.disabled]: disabled,
          'opacity-50 cursor-not-allowed': disabled
        },

        // 尺寸样式
        {
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg'
        },

        // 外部样式
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
```

### 2. 样式命名规范

```less
// CSS Modules命名规范
.component {
  // 基础样式

  &-header {
    // 子元素样式
  }

  &-content {
    // 子元素样式
  }

  // 修饰符
  &.primary {
    // 主要变体
  }

  &.secondary {
    // 次要变体
  }

  // 状态
  &:hover {
    // 悬停状态
  }

  &.disabled {
    // 禁用状态
  }
}
```

## 性能优化

### 1. CSS 优化

- 使用 CSS Modules 避免样式冲突
- Tailwind 的 purge 功能移除未使用的样式
- 组件级别的样式懒加载

### 2. 包大小优化

- Tree-shaking 移除未使用的 tokens
- 按需导入组件
- 避免全局 CSS 文件

## 迁移指南

### 1. 从现有 CSS 迁移

```less
// 旧的CSS
.old-component {
  color: #008000;
  background: #ffffff;
  padding: 16px;
  border: 1px solid #e0e0e0;
}

// 新的CSS Modules + Tailwind
.component {
  color: theme('colors.primary');
  background: theme('colors.panel');
  @apply p-4 border border-border;
}
```

### 2. 组件重构步骤

1. **分析现有样式**：识别可以用 Tailwind 替代的部分
2. **提取复杂样式**：将复杂样式移到 CSS Modules
3. **应用 tokens**：使用`theme()`函数引用设计 tokens
4. **测试验证**：确保视觉效果一致
5. **清理代码**：移除旧的 CSS 文件

## 工具和配置

### 1. 必要的依赖

```json
{
  "devDependencies": {
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "less": "^4.x",
    "clsx": "^2.x"
  }
}
```

### 2. VSCode 配置

```json
// .vscode/settings.json
{
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "'([^']*)'"],
    ["className\\s*=\\s*['\"`]([^'\"`]*)['\"`]"]
  ]
}
```

## 最佳实践总结

### ✅ 推荐做法

- 优先使用 Tailwind 工具类
- 复杂样式使用 CSS Modules
- 通过 tokens 管理设计变量
- 保持组件样式的内聚性
- 使用 TypeScript 确保类型安全

### ❌ 避免做法

- 不要使用全局 CSS 文件
- 不要硬编码颜色和尺寸值
- 不要在多个地方重复定义样式
- 不要忽略响应式设计
- 不要过度使用!important

## 未来规划

1. **组件库扩展**：建立完整的基础组件库
2. **设计工具集成**：与 Figma 等设计工具同步
3. **自动化测试**：视觉回归测试
4. **文档完善**：Storybook 组件文档
5. **性能监控**：CSS 性能分析和优化

---

这个架构设计确保了项目的可维护性、可扩展性和开发效率，为团队提供了清晰的开发指南。
