import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { WhatsApp } from '@material-ui/icons'
import { deepPurple } from '@material-ui/core/colors'
import styled from 'styled-components'

import { URLS } from 'config/constants'

const ColorButton = withStyles(() => ({
  root: {
    color: deepPurple[500],
    '&:hover': {
      color: deepPurple[300],
    },
  },
}))(Button)

const useStyles = makeStyles({
  label: {
    textTransform: 'capitalize',
  },
})

const SupportLink = styled.a`
  text-decoration: none;
`

const Support = () => {
  const classes = useStyles()

  return (
    <SupportLink href={URLS.TAWKTO_URL} target="_blank" rel="noopener noreferrer">
      <ColorButton
        classes={{
          label: classes.label,
        }}
        startIcon={<WhatsApp />}
      >
        Support Here
      </ColorButton>
    </SupportLink>
  )
}

export default Support
