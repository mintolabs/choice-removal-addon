import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, IconButton, Typography } from '@material-ui/core'
import { Menu, List, Settings, Help, Close } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import styled from 'styled-components'

import { PATHS, TITLES, URLS } from 'config/constants'
import Logo from 'components/Logo'
import Header from 'components/Header'
import Support from 'components/Support'
import KofiButton from 'components/KofiButton'

const useStyles = makeStyles({
  paperAnchorLeft: {
    width: '80%',
  },
  menuWrapper: {
    position: 'relative',
    height: '100%',
  },
  menuItemText: {
    marginLeft: '10px',
    fontWeight: 'bold',
  },
  kofiButtonWrapper: {
    position: 'absolute',
    bottom: '1rem',
    width: '100%',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
  },
})

const SlidingMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 14px 4px 10px;
  border-bottom: 1px solid ${grey[500]};
`

const MenuItemWrapper = styled.div`
  border-bottom: 1px solid ${grey[500]};
`

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  color: ${grey[500]};
  padding: 14px 0 14px 14px;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${grey[800]};
  }
`

const SlidingMenu = () => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = open => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    setIsOpen(open)
  }

  return (
    <div>
      <Header>
        <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>

        <Support />
      </Header>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        classes={{
          paperAnchorLeft: classes.paperAnchorLeft, // `.MuiDrawer-paperAnchorLeft`
        }}
      >
        <div className={classes.menuWrapper}>
          <SlidingMenuHeader>
            <Logo />

            <IconButton aria-label="close" onClick={toggleDrawer(false)}>
              <Close />
            </IconButton>
          </SlidingMenuHeader>

          <MenuItemWrapper>
            <MenuItem to={PATHS.QUESTION_LIST} onClick={toggleDrawer(false)}>
              <List />
              <Typography
                variant="body1"
                classes={{
                  body1: classes.menuItemText,
                }}
              >
                {TITLES.QUESTION_LIST}
              </Typography>
            </MenuItem>
          </MenuItemWrapper>

          <MenuItemWrapper>
            <MenuItem to={PATHS.SETTINGS} onClick={toggleDrawer(false)}>
              <Settings />
              <Typography
                variant="body1"
                classes={{
                  body1: classes.menuItemText,
                }}
              >
                {TITLES.SETTINGS}
              </Typography>
            </MenuItem>
          </MenuItemWrapper>

          <MenuItemWrapper>
            <MenuItem to={PATHS.HELP} onClick={toggleDrawer(false)}>
              <Help />
              <Typography
                variant="body1"
                classes={{
                  body1: classes.menuItemText,
                }}
              >
                {TITLES.HELP}
              </Typography>
            </MenuItem>
          </MenuItemWrapper>

          <div className={classes.kofiButtonWrapper}>
            <a
              className={classes.link}
              href={URLS.KOFI_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <KofiButton />
            </a>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default SlidingMenu
