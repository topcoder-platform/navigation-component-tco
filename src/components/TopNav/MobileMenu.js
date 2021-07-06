import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import cn from 'classnames'
import styles from './MobileMenu.module.scss'

const MobileMenu = ({
  rightMenu, onClickLogo, menu, activeChildId, createHandleClickItem, backToTcUrl, backToTcUrlText
}) => {
  const getSubMenu = (items) => {
    if (!items) {
      return null
    }
    return items.map((i, k) => {
      return (
        <a
          className={styles.menuItem}
          href={i.href}
          key={`level3-${k}`}
        >
          {i.title}
        </a>
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
                <a
                  className={cn(styles.secondaryNavMobileItem, level2.id === activeChildId && styles.secondaryNavMobileItemOpen, level2.subMenu && styles.hasSubMenu)}
                  href={!_.get(level2, 'subMenu.length', 0) && level2.href}
                  key={`level2-${i}`}
                  onClick={level2.subMenu && level2.subMenu.length > 0 ? createHandleClickItem(level2.id) : null}
                >
                  {renderItem(level2)}
                </a>
                {level2.subMenu && level2.id === activeChildId && getSubMenu(level2.subMenu)}
              </>
            )
          }
        })}
      </div>
      <div className={styles.bottomMenu}>
        <a
          href={backToTcUrl}
        >
          {backToTcUrlText || 'Back to Topcoder'}
        </a>
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
