import React, { useState, useEffect } from 'react'
// 移除重复的模块声明
import logo from './assets/logo/logo.svg' // 使用正确的SVG文件
import DomainSearch from './components/DomainSearch'

function App(): React.ReactElement {
  // 主题切换功能
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
  // 添加时间显示功能
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString())
  // 当前激活的菜单项
  const [activeMenu, setActiveMenu] = useState<string>('dashboard')

  useEffect(() => {
    // 应用主题到body元素
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light')

    // 更新时间
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 1000)

    return () => clearInterval(interval)
  }, [isDarkTheme])

  // 渲染页面内容
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className='panel'>
            <p>仪表盘开发中...</p>
          </div>
        )
      case 'domain-search':
        return <DomainSearch />
      case 'domain-management':
        return (
          <div className='panel'>
            <p>域名管理开发中...</p>
          </div>
        )
      case 'user-management':
        return (
          <div className='panel'>
            <p>用户管理开发中...</p>
          </div>
        )
      case 'settings':
        return (
          <div className='panel'>
            <p>系统设置开发中...</p>
          </div>
        )
      default:
        return (
          <div className='panel'>
            <p>页面不存在</p>
          </div>
        )
    }
  }

  // 页面标题
  const getPageTitle = () => {
    switch (activeMenu) {
      case 'dashboard':
        return '仪表盘'
      case 'domain-search':
        return '域名查询'
      case 'domain-management':
        return '域名管理'
      case 'user-management':
        return '用户管理'
      case 'settings':
        return '系统设置'
      default:
        return '未知页面'
    }
  }

  return (
    <div className='app-container'>
      <div className='sidebar'>
        <div className='nav-brand'>
          <img src={logo} alt='DotMatrix Logo' className='nav-brand-logo' />
          <div className='nav-brand-title'>DotMatrix.io</div>
        </div>
        <nav className='nav-menu'>
          <div
            className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            <i className='fas fa-chart-line'></i>仪表盘
          </div>
          <div
            className={`nav-item ${activeMenu === 'domain-search' ? 'active' : ''}`}
            onClick={() => setActiveMenu('domain-search')}
          >
            <i className='fas fa-search'></i>域名查询
          </div>
          <div
            className={`nav-item ${activeMenu === 'domain-management' ? 'active' : ''}`}
            onClick={() => setActiveMenu('domain-management')}
          >
            <i className='fas fa-tags'></i>域名管理
          </div>
          <div
            className={`nav-item ${activeMenu === 'user-management' ? 'active' : ''}`}
            onClick={() => setActiveMenu('user-management')}
          >
            <i className='fas fa-users'></i>用户管理
          </div>
          <div
            className={`nav-item ${activeMenu === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveMenu('settings')}
          >
            <i className='fas fa-cog'></i>系统设置
          </div>
        </nav>
      </div>
      <div className='main-content'>
        <header className='header'>
          <div>
            <h1>{getPageTitle()}</h1>
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
        <div className='container'>{renderContent()}</div>
      </div>
    </div>
  )
}

export default App
