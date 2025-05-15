import React, { useState, useEffect } from 'react'
import SearchForm from './SearchForm'
import SearchResults from './SearchResults'
import SearchProgress from './SearchProgress'
import { DomainInfo, QueryStatus } from '../../types/global'

// 模拟查询批次大小
const BATCH_SIZE = 20
// 批次间延迟（毫秒）
const BATCH_DELAY = 1500

// 域名查询主组件
const DomainSearch: React.FC = () => {
  // 查询状态
  const [queryStatus, setQueryStatus] = useState<QueryStatus>({
    isQuerying: false,
    currentBatch: 0,
    totalBatches: 0,
    progress: 0,
    shouldStop: false
  })

  // 查询结果
  const [searchResults, setSearchResults] = useState<DomainInfo[]>([])

  // 筛选后的结果
  const [filteredResults, setFilteredResults] = useState<DomainInfo[]>([])

  // 查询参数
  const [searchParams, setSearchParams] = useState({
    length: 5,
    extension: 'com'
  })

  // 当结果变化时更新筛选结果
  useEffect(() => {
    setFilteredResults(searchResults)
  }, [searchResults])

  // 开始查询
  const handleStartQuery = (params: { length: number; extension: string }) => {
    setSearchParams(params)
    setSearchResults([]) // 清空之前的结果

    // 计算总批次数（模拟）
    const totalDomains = Math.pow(36, params.length) // 假设使用a-z和0-9，共36个字符
    const totalBatches = Math.ceil(Math.min(totalDomains, 100) / BATCH_SIZE) // 限制最多100个结果

    setQueryStatus({
      isQuerying: true,
      currentBatch: 1,
      totalBatches,
      progress: 0,
      shouldStop: false
    })

    // 开始批次查询
    processQueryBatch(1, totalBatches, params)
  }

  // 处理查询批次
  const processQueryBatch = (currentBatch: number, totalBatches: number, params: typeof searchParams) => {
    if (queryStatus.shouldStop || currentBatch > totalBatches) {
      finishQuery()
      return
    }

    // 更新进度
    setQueryStatus((prev: QueryStatus) => ({
      ...prev,
      currentBatch,
      progress: Math.floor(((currentBatch - 1) / totalBatches) * 100)
    }))

    // 模拟查询结果
    const batchResults: DomainInfo[] = []
    const batchSize = Math.floor(Math.random() * 10) + 10 // 10-20条结果

    for (let i = 0; i < batchSize; i++) {
      const id = searchResults.length + i + 1
      const name = generateRandomDomain(params.length)
      const isAvailable = Math.random() > 0.6 // 40%可能性可注册

      batchResults.push({
        id,
        name,
        extension: params.extension,
        length: params.length,
        isAvailable
      })
    }

    // 更新结果
    setSearchResults(prev => [...prev, ...batchResults])

    // 等待一段时间后处理下一批
    setTimeout(() => {
      processQueryBatch(currentBatch + 1, totalBatches, params)
    }, BATCH_DELAY)
  }

  // 完成查询
  const finishQuery = () => {
    setQueryStatus((prev: QueryStatus) => ({
      ...prev,
      isQuerying: false,
      progress: 100
    }))
  }

  // 生成随机域名
  const generateRandomDomain = (length: number) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // 停止查询
  const handleStopQuery = () => {
    setQueryStatus((prev: QueryStatus) => ({ ...prev, shouldStop: true }))
  }

  // 保存可注册域名
  const handleSaveDomains = () => {
    const availableDomains = searchResults.filter(domain => domain.isAvailable)
    if (availableDomains.length === 0) {
      alert('没有可注册的域名可保存')
      return
    }

    // 模拟保存操作
    console.log(`已保存${availableDomains.length}个可注册域名到数据库`)
    alert(`已成功保存${availableDomains.length}个可注册域名到数据库`)
  }

  // 筛选可注册域名
  const handleFilterAvailable = (showOnlyAvailable: boolean) => {
    if (showOnlyAvailable) {
      setFilteredResults(searchResults.filter(domain => domain.isAvailable))
    } else {
      setFilteredResults(searchResults)
    }
  }

  return (
    <div className='domain-search-container'>
      <div className='panel'>
        <SearchForm onStartQuery={handleStartQuery} initialValues={searchParams} />
      </div>

      <div className='panel mt-4'>
        <div className='panel-header'>
          <div>
            查询结果: <span id='result-count'>{searchResults.length}</span> 个域名
          </div>
          <SearchProgress
            status={queryStatus}
            onStopQuery={handleStopQuery}
            onSaveDomains={handleSaveDomains}
            onFilterAvailable={handleFilterAvailable}
          />
        </div>

        <SearchResults results={filteredResults} queryStatus={queryStatus} />
      </div>
    </div>
  )
}

export default DomainSearch
