import React from 'react'
import { QueryStatus } from '../../types/global'

interface SearchProgressProps {
  status: QueryStatus
  onStopQuery: () => void
  onSaveDomains: () => void
  onFilterAvailable: (showOnlyAvailable: boolean) => void
}

const SearchProgress: React.FC<SearchProgressProps> = ({ status, onStopQuery, onSaveDomains, onFilterAvailable }) => {
  const [showOnlyAvailable, setShowOnlyAvailable] = React.useState(false)

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    setShowOnlyAvailable(checked)
    onFilterAvailable(checked)
  }

  return (
    <div className='flex items-center'>
      <div className='query-status'>
        {status.isQuerying ? (
          <>
            <span className='spinner mr-2'></span>
            <span>
              查询中... 第{status.currentBatch}批/共{status.totalBatches}批 ({status.progress}%)
            </span>
          </>
        ) : (
          <span>
            <i className='fas fa-check-circle text-success mr-2'></i>
            {status.currentBatch > 0 ? '查询完成' : '准备就绪'}
          </span>
        )}
      </div>

      {status.isQuerying && (
        <button className='btn btn-danger ml-3' onClick={onStopQuery} disabled={status.shouldStop}>
          {status.shouldStop ? (
            <>
              <i className='fas fa-spinner fa-spin mr-1'></i> 停止中...
            </>
          ) : (
            <>
              <i className='fas fa-stop mr-1'></i> 停止查询
            </>
          )}
        </button>
      )}

      <button className='btn btn-success ml-2' onClick={onSaveDomains} disabled={status.isQuerying}>
        <i className='fas fa-save mr-1'></i> 一键保存
      </button>

      <div className='filter-quick ml-3'>
        <label className='flex items-center text-sm'>
          <input type='checkbox' className='mr-1' checked={showOnlyAvailable} onChange={handleFilterChange} />
          <span>仅显示可注册</span>
        </label>
      </div>
    </div>
  )
}

export default SearchProgress
