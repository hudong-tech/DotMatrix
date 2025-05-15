import React, { useState, useEffect } from 'react'
import { DomainInfo, QueryStatus } from '../../types/global'

interface SearchResultsProps {
  results: DomainInfo[]
  queryStatus: QueryStatus
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, queryStatus }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [filteredResults, setFilteredResults] = useState<DomainInfo[]>([])

  // 当结果变化时，重置分页
  useEffect(() => {
    setCurrentPage(1)
    setFilteredResults(results)
  }, [results])

  // 计算当前页的结果
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentResults = filteredResults.slice(startIndex, endIndex)

  // 总页数
  const totalPages = Math.ceil(filteredResults.length / pageSize)

  return (
    <>
      <div className='overflow-auto'>
        <table className='result-table'>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>ID</th>
              <th style={{ width: '40%' }}>域名</th>
              <th style={{ width: '15%' }}>长度</th>
              <th style={{ width: '15%' }}>状态</th>
              <th style={{ width: '25%' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {currentResults.map(domain => (
              <tr key={domain.id} className={queryStatus.isQuerying ? 'new-result' : ''}>
                <td>{domain.id}</td>
                <td>
                  {domain.name}.{domain.extension}
                </td>
                <td>{domain.length}</td>
                <td>
                  <span className={`status-badge status-${domain.isAvailable ? 'available' : 'taken'}`}>
                    {domain.isAvailable ? '可注册' : '已注册'}
                  </span>
                </td>
                <td>
                  <button className='btn btn-sm mr-1'>
                    <i className='fas fa-star'></i>
                  </button>
                  <button className='btn btn-sm mr-1'>
                    <i className='fas fa-info-circle'></i>
                  </button>
                  <button className='btn btn-sm'>
                    <i className='fas fa-tag'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='pagination p-3 flex items-center justify-between'>
        <div>
          <span>
            显示 {filteredResults.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, filteredResults.length)} /{' '}
            {filteredResults.length} 结果
          </span>
        </div>
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-2'>
            <span className='whitespace-nowrap'>每页：</span>
            <select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              className='search-input mb-0 w-16 text-center mr-2'
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='20'>20</option>
              <option value='50'>50</option>
            </select>
          </div>
          <button
            className='btn btn-sm mr-8'
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            上一页
          </button>
          <button
            className='btn btn-sm'
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            下一页
          </button>
        </div>
      </div>
    </>
  )
}

export default SearchResults
