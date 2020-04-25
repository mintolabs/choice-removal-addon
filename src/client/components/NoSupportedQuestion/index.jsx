import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { LiveHelp } from '@material-ui/icons'
import { deepPurple, grey, red } from '@material-ui/core/colors'

import { URLS } from 'config/constants'

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    '&:hover': {
      backgroundColor: deepPurple[300],
    },
  },
}))(Button)

const useStyles = makeStyles({
  root: {
    width: '85%',
    margin: '0 auto',
    color: grey[500],
  },
  title: {
    fontWeight: '500',
    marginBottom: '1rem',
  },
  linkWrapper: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  link: {
    textDecoration: 'none',
  },
  emphasize: {
    fontWeight: '500',
    color: red[500],
  },
  multipleAccounts: {
    borderTop: `1px solid ${grey[500]}`,
    marginTop: '0.5rem',
    marginBottom: '1rem',
    paddingTop: '0.5rem',
  },
})

const NoSupportedQuestion = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.title}>You do not have any supported questions</div>

      <div>{process.env.ADDON_NAME} only supports 3 types of question:</div>
      <ul>
        <li>Multiple choice</li>
        <li>Dropdown</li>
        <li>Checkboxes</li>
      </ul>

      <div>Please create at least one.</div>

      <div className={classes.multipleAccounts}>
        Or maybe,{' '}
        <span className={classes.emphasize}>
          you are logging in with multiple Google accounts.{' '}
        </span>
        Click the button below!
      </div>

      <div className={classes.linkWrapper}>
        <a className={classes.link} href={URLS.FAQ_URL} target="_blank" rel="noopener noreferrer">
          <ColorButton startIcon={<LiveHelp />} variant="contained">
            Check our FAQ
          </ColorButton>
        </a>
      </div>
    </div>
  )
}

export default NoSupportedQuestion
