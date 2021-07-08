import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'topcoder-react-utils'
import cn from 'classnames'
import styles from './MobileMenu.module.scss'

const MobileMenu = ({
  rightMenu, onClickLogo, menu, activeChildId, createHandleClickItem, backToTcUrl, backToTcUrlText
}) => {
  const getSubMenu = (items) => {
    if (!items) {
      return null
    }
    const { pathname } = window.location
    return items.map((i, k) => {
      return (
        <Link
          className={cn(styles.menuItem, i.href === pathname && styles.menuItemCurrent)}
          to={i.href}
          key={`level3-${k}`}
        >
          {i.title}
        </Link>
      )
    })
  }

  const renderItem = (item) => {
    if (item.imageSrc) {
      return <img className={styles.imageItem} src={item.imageSrc} />
    } else {
      return item.title
    }
  }

  return (
    <div className={styles.secondaryNavMobile}>
      <div className={styles.menuList}>
        {menu.subMenu && menu.subMenu.map((level2, i) => {
          if ((level2.subMenu && level2.subMenu.length > 0) || level2.href) {
            return (
              <>
                <Link
                  className={cn(styles.secondaryNavMobileItem, level2.id === activeChildId && styles.secondaryNavMobileItemOpen, level2.subMenu && styles.hasSubMenu)}
                  to={!_.get(level2, 'subMenu.length', 0) && level2.href}
                  enforceA={level2.subMenu && level2.subMenu.length > 0}
                  key={`level2-${i}`}
                  onClick={level2.subMenu && level2.subMenu.length > 0 ? createHandleClickItem(level2.id) : null}
                >
                  {renderItem(level2)}
                </Link>
                {level2.subMenu && level2.id === activeChildId && getSubMenu(level2.subMenu)}
              </>
            )
          }
        })}
      </div>
      <div className={styles.bottomMenu}>
        <Link
          to={backToTcUrl}
        >
          {backToTcUrlText || 'Back to Topcoder'}
        </Link>
        <span className={styles.line} />
        {rightMenu}
      </div>
    </div>
  )
}

MobileMenu.propTypes = {
  menu: PropTypes.object,
  activeChildId: PropTypes.any,
  onClickLogo: PropTypes.func,
  rightMenu: PropTypes.node,
  createHandleClickItem: PropTypes.func,
  backToTcUrl: PropTypes.string,
  backToTcUrlText: PropTypes.string
}

export default MobileMenu
