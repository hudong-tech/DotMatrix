import { DomainInfo, UserInfo } from './domain'

// 接口类型定义

// 通用response result
export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize: number
    total: number | 0
  }
}

// 分页
export interface PageParams {
  pageNum: number
  pageSize?: number
}

// 登录信息
export namespace Login {
  export interface params {
    userName: string
    userPwd: string
  }
}
