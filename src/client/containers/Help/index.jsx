import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Feedback, LiveHelp } from '@material-ui/icons'
import { deepPurple, grey } from '@material-ui/core/colors'
import styled from 'styled-components'

import { URLS } from 'config/constants'
import KofiButton from 'components/KofiButton'

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    '&:hover': {
      backgroundColor: deepPurple[300],
    },
  },
}))(Button)

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkWrapper: {
    width: '100%',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  link: {
    textDecoration: 'none',
  },
}))

export const VersionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  bottom: 1rem;
`

export const Version = styled.span`
  color: ${grey[400]};
  font-weight: 500;
`

const Help = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.linkWrapper}>
        <a
          className={classes.link}
          href={URLS.FEEDBACK_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ColorButton startIcon={<Feedback />} variant="contained">
            Send A Feedback
          </ColorButton>
        </a>
      </div>

      <div className={classes.linkWrapper}>
        <a className={classes.link} href={URLS.FAQ_URL} target="_blank" rel="noopener noreferrer">
          <ColorButton startIcon={<LiveHelp />} variant="contained">
            Check our FAQ
          </ColorButton>
        </a>
      </div>

      <div className={classes.linkWrapper}>
        <a className={classes.link} href={URLS.KOFI_URL} target="_blank" rel="noopener noreferrer">
          <KofiButton />
        </a>
      </div>

      <VersionWrapper>
        <Version>Version {process.env.ADDON_VERSION}</Version>
      </VersionWrapper>
    </div>
  )
}

export default Help
