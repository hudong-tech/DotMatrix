import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并和优化 className 的工具函数
 *
 * 使用 clsx 和 tailwind-merge 合并多个类名，解决 Tailwind CSS 开发中的常见问题
 *
 * 为什么这么做：
 *
 * 1. 解决类名合并问题
 *    // ❌ 传统方式 - 容易出错，难以维护
 *    <div className={`${styles.header} ${isActive ? 'bg-primary' : 'bg-secondary'} ${className || ''}`}>
 *
 *    // ✅ 使用cn函数 - 简洁、安全
 *    <div className={cn(styles.header, isActive ? 'bg-primary' : 'bg-secondary', className)}>
 *
 * 2. 处理Tailwind类名冲突
 *    // 问题：后面的类可能不会覆盖前面的类
 *    className="bg-red-500 bg-blue-500" // 可能两个都生效
 *
 *    // cn函数会智能合并，确保只有最后一个生效
 *    cn('bg-red-500', 'bg-blue-500') // 结果：'bg-blue-500'
 *
 * 3. 支持条件类名
 *    cn({
 *      'text-primary': isActive,
 *      'text-secondary': !isActive,
 *      'opacity-50': disabled
 *    })
 *
 * 4. 避免空值和undefined导致的问题
 *    cn('base-class', condition && 'conditional-class', null, undefined)
 *    // 自动过滤掉 null 和 undefined
 *
 * @param inputs - 需要合并的类名，支持字符串、对象、数组、条件表达式等
 * @returns 合并并优化后的类名字符串
 *
 * @example
 * // 基础用法
 * cn('text-base', 'text-primary') // 'text-base text-primary'
 *
 * // 条件类名
 * cn('btn', { 'btn-active': isActive, 'btn-disabled': disabled })
 *
 * // 混合使用
 * cn(styles.button, 'px-4 py-2', isLoading && 'opacity-50', className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
