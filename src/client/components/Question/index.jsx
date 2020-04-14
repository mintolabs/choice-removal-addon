import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  FormControlLabel,
  Switch,
} from '@material-ui/core'
import {
  ExpandMore,
  RadioButtonChecked,
  ArrowDropDownCircle,
  CheckBox,
  Error,
} from '@material-ui/icons'
import { deepPurple, grey } from '@material-ui/core/colors'

import { SUPPORTED_QUESTION_TYPES } from 'config/constants'

const PurpleSwitch = withStyles({
  switchBase: {
    '&$checked': {
      color: deepPurple[500],
    },
    '&$checked + $track': {
      backgroundColor: deepPurple[500],
    },
  },
  checked: {},
  track: {},
})(Switch)

const useStyles = makeStyles(theme => ({
  content: {
    alignItems: 'center',
  },
  ExpansionPanelDetailsRoot: {
    display: 'block',
  },
  questionTypeIcon: {
    fontSize: theme.typography.pxToRem(16),
    flexShrink: 0,
    marginRight: '0.5rem',
  },
  questionTitle: {
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
  },
  fullQuestionTitle: {
    marginBottom: '1rem',
    fontSize: '0.875rem', // 14/16
  },
  enabled: {
    color: deepPurple[500],
  },
  disabled: {
    color: grey[500],
  },
}))

const Question = props => {
  const classes = useStyles()
  const { question, questionConfig, expanded, handleChange, toggleSwitch } = props

  const getQuestionIcon = type => {
    switch (type) {
      case SUPPORTED_QUESTION_TYPES.MULTIPLE_CHOICE:
        return (
          <RadioButtonChecked className={questionConfig ? classes.enabled : classes.disabled} />
        )
      case SUPPORTED_QUESTION_TYPES.LIST:
        return (
          <ArrowDropDownCircle className={questionConfig ? classes.enabled : classes.disabled} />
        )
      case SUPPORTED_QUESTION_TYPES.CHECKBOX:
        return <CheckBox className={questionConfig ? classes.enabled : classes.disabled} />
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
      <ExpansionPanelDetails
        classes={{
          root: classes.ExpansionPanelDetailsRoot,
        }}
      >
        <Typography className={classes.fullQuestionTitle}>Title: {question.title}</Typography>
        <FormControlLabel
          control={
            <PurpleSwitch
              checked={questionConfig}
              name={`switch-${question.id}`}
              color="primary"
              onChange={e => toggleSwitch(e, question.id)}
            />
          }
          label="Remove Choices"
        />
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
  questionConfig: PropTypes.bool.isRequired,
  expanded: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  toggleSwitch: PropTypes.func.isRequired,
}

export default Question
