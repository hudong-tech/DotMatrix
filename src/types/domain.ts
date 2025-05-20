// 域名信息类型
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

// 用户信息类型
export interface UserInfo {
  id: string
  username: string
  role: 'admin' | 'user'
  avatar?: string
  lastLogin?: Date
}
