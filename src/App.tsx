import React, { useState, useEffect } from 'react'
// 移除重复的模块声明
import logo from './assets/logo/logo.svg' // 使用正确的SVG文件

function App(): React.ReactElement {
  // 主题切换功能
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
  // 添加时间显示功能
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString())

  useEffect(() => {
    // 应用主题到body元素
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light')

    // 更新时间
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [isDarkTheme])

  return (
    <div className='app-container'>
      <div className='sidebar'>
        <div className='nav-brand'>
          <img src={logo} alt='DotMatrix Logo' className='nav-brand-logo' />
          <div className='nav-brand-title'>DotMatrix.io</div>
        </div>
        <nav className='nav-menu'>
          <div className='nav-item active'>
            <i className='fas fa-chart-line'></i>仪表盘
          </div>
          <div className='nav-item'>
            <i className='fas fa-search'></i>域名查询
          </div>
          <div className='nav-item'>
            <i className='fas fa-tags'></i>域名管理
          </div>
          <div className='nav-item'>
            <i className='fas fa-users'></i>用户管理
          </div>
          <div className='nav-item'>
            <i className='fas fa-cog'></i>系统设置
          </div>
        </nav>
      </div>
      <div className='main-content'>
        <header className='header'>
          <div>
            <h1>仪表盘</h1>
          </div>
          <div className='flex items-center'>
            <div className='user-info mr-4'>
              <span>用户: ADMIN</span> |{' '}
              <span className='time-display' id='timeDisplay'>
                {' '}
                {time}
              </span>
            </div>

            <div className='theme-switch-wrapper mr-4'>
              <label className='theme-switch'>
                <input type='checkbox' checked={isDarkTheme} onChange={() => setIsDarkTheme(!isDarkTheme)} />
                <span className='slider'></span>
              </label>
            </div>

            <a href='#' className='logout-link'>
              <i className='fas fa-power-off'></i> 退出
            </a>
          </div>
        </header>
        <div className='container'>
          <div className='panel'>
            <p>开发中...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
