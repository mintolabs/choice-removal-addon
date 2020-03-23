import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Drawer, IconButton } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

const useStyles = makeStyles({
  paperAnchorLeft: {
    width: '80%',
  },
})

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
      <IconButton aria-label="menu" onClick={toggleDrawer(true)}>
        <Menu fontSize="large" />
      </IconButton>

      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        classes={{
          paperAnchorLeft: classes.paperAnchorLeft, // `.MuiDrawer-paperAnchorLeft`
        }}
      >
        <div>Inside Drawer</div>
      </Drawer>
    </div>
  )
}

export default SlidingMenu
