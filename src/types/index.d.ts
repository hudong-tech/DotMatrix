// 导出所有类型
export * from './api'
export * from './components'
export * from './domain'
export * from './router'
export * from './store'

// 图片文件声明
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

// SVG模块声明
declare module '*.svg' {
  import React from 'react'
  const SVG: React.FC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

// CSS模块声明
declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}

// 自定义全局类型
declare interface Window {
  // 添加需要的Window属性扩展
}
