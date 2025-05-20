import React from 'react'
import logoSrc, { ReactComponent as Logo } from '@/assets/logo/logo.svg'
import { MenuProps } from '@/types/components'
import styles from './index.module.less'

const Menu: React.FC<MenuProps> = ({ activeMenu, onMenuClick }) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.navBrand}>
        <Logo className={styles.navBrandLogo} />
        <div className={styles.navBrandTitle}>DotMatrix.io</div>
      </div>
      <nav className={styles.navMenu}>
        <div
          className={`${styles.navItem} ${activeMenu === 'dashboard' ? styles.active : ''}`}
          onClick={() => onMenuClick('dashboard')}
        >
          <i className='fas fa-chart-line'></i>仪表盘
        </div>
        <div
          className={`${styles.navItem} ${activeMenu === 'domain-search' ? styles.active : ''}`}
          onClick={() => onMenuClick('domain-search')}
        >
          <i className='fas fa-search'></i>域名查询
        </div>
        <div
          className={`${styles.navItem} ${activeMenu === 'domain-management' ? styles.active : ''}`}
          onClick={() => onMenuClick('domain-management')}
        >
          <i className='fas fa-tags'></i>域名管理
        </div>
        <div
          className={`${styles.navItem} ${activeMenu === 'user-management' ? styles.active : ''}`}
          onClick={() => onMenuClick('user-management')}
        >
          <i className='fas fa-users'></i>用户管理
        </div>
        <div
          className={`${styles.navItem} ${activeMenu === 'settings' ? styles.active : ''}`}
          onClick={() => onMenuClick('settings')}
        >
          <i className='fas fa-cog'></i>系统设置
        </div>
      </nav>
    </div>
  )
}

export default Menu
