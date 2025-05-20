// 用于声明外部资源文件的类型

// Less 模块声明
declare module '*.less' {
  const resource: { [key: string]: string }
  export = resource
}

// CSS 模块声明
declare module '*.css' {
  const resource: { [key: string]: string }
  export = resource
}

// 图片文件声明
declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

// SVG 文件声明
declare module '*.svg' {
  import * as React from 'react'
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>
  const src: string
  export default src
}
