import React from 'react'
import { NavHeaderProps } from '@/types/components'
import styles from './index.module.less'

const NavHeader: React.FC<NavHeaderProps> = ({ title, time, isDarkTheme, onThemeChange }) => {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={`${styles.flex} ${styles.itemsCenter}`}>
        <div className={`${styles.userInfo} ${styles.mr4}`}>
          <span>用户: ADMIN</span> |{' '}
          <span className={styles.timeDisplay} id='timeDisplay'>
            {' '}
            {time}
          </span>
        </div>

        <div className={`${styles.themeSwitchWrapper} ${styles.mr4}`}>
          <label className={styles.themeSwitch}>
            <input type='checkbox' checked={isDarkTheme} onChange={() => onThemeChange(!isDarkTheme)} />
            <span className={styles.slider}></span>
          </label>
        </div>

        <a href='#' className={styles.logoutLink}>
          <i className='fas fa-power-off'></i> 退出
        </a>
      </div>
    </header>
  )
}

export default NavHeader
