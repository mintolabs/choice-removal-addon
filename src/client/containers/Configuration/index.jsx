import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStructuredSelector } from 'reselect'
import { useSelector, useDispatch } from 'react-redux'
import { usePromiseTracker } from 'react-promise-tracker'

import { useInjectSaga } from 'utils/injectSaga'

import SlidingMenu from 'components/SlidingMenu'
import { makeSelectError, makeSelectSupportedQuestions } from './selectors'
import { getSupportedFormQuestions } from './actions'
import saga from './saga'

const key = 'global'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

const stateSelector = createStructuredSelector({
  supportedQuestions: makeSelectSupportedQuestions(),
  error: makeSelectError(),
})

const Configuration = () => {
  useInjectSaga({ key, saga })

  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)

  const { supportedQuestions, error } = useSelector(stateSelector)

  console.log(supportedQuestions, error)

  const dispatch = useDispatch()

  const { promiseInProgress } = usePromiseTracker()

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  const handleGetSupportedFormQuestions = async () => {
    dispatch(getSupportedFormQuestions())
  }

  /**
   * Get user data from database
   */
  useEffect(() => {
    handleGetSupportedFormQuestions()
  }, [])

  return (
    <div>
      <SlidingMenu />

      <div className={classes.root}>
        {promiseInProgress ? (
          <CircularProgress />
        ) : (
          <div>
            <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>General settings</Typography>
                <Typography className={classes.secondaryHeading}>
                  I am an expansion panel
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>Users</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                  lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        )}
      </div>
    </div>
  )
}

export default Configuration
