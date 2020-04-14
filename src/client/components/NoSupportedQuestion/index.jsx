import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'

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

      <div>Please create at least one</div>
    </div>
  )
}

export default NoSupportedQuestion
