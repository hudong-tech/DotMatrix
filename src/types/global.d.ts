// 全局类型声明文件

// SVG模块声明
declare module '*.svg' {
  const content: string
  export default content
}

// 图片文件声明
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'

// 自定义全局类型
declare interface Window {
  // 添加需要的Window属性扩展
}

// 域名类型定义
export interface DomainInfo {
  id: number
  name: string
  extension: string
  length: number
  isAvailable: boolean
  isStarred?: boolean
  tags?: string[]
  notes?: string
}

// 查询状态类型
export interface QueryStatus {
  isQuerying: boolean
  currentBatch: number
  totalBatches: number
  progress: number
  shouldStop: boolean
}
