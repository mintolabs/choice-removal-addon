import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core'
import {
  ExpandMore,
  RadioButtonChecked,
  ArrowDropDownCircle,
  CheckBox,
  Error,
} from '@material-ui/icons'

import { SUPPORTED_QUESTION_TYPES } from 'config/constants'

const useStyles = makeStyles(theme => ({
  content: {
    alignItems: 'center',
  },
  questionTypeIcon: {
    fontSize: theme.typography.pxToRem(16),
    flexShrink: 0,
    marginRight: '1rem',
  },
  questionTitle: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
  },
}))

const Question = props => {
  const classes = useStyles()
  const { question, expanded, handleChange } = props

  const getQuestionIcon = type => {
    switch (type) {
      case SUPPORTED_QUESTION_TYPES.MULTIPLE_CHOICE:
        return <RadioButtonChecked />
      case SUPPORTED_QUESTION_TYPES.LIST:
        return <ArrowDropDownCircle />
      case SUPPORTED_QUESTION_TYPES.CHECKBOX:
        return <CheckBox />
      default:
        return <Error />
    }
  }

  return (
    <ExpansionPanel
      key={question.id}
      expanded={expanded === question.id}
      onChange={handleChange(question.id)}
    >
      <ExpansionPanelSummary
        classes={{
          content: classes.content, // .MuiExpansionPanelSummary-content
        }}
        id={`${question.id}-header`}
        expandIcon={<ExpandMore />}
        aria-controls={`${question.id}-content`}
      >
        <Typography className={classes.questionTypeIcon}>
          {getQuestionIcon(question.type)}
        </Typography>
        <Typography className={classes.questionTitle}>{question.title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
          sit amet blandit leo lobortis eget.
        </Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  )
}

Question.propTypes = {
  question: {
    id: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }.isRequired,
  expanded: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default Question
