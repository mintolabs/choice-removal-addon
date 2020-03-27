import * as formUtilities from './forms-utilities'
import * as triggerFunctions from './helpers/trigger'
import * as userFunctions from './models/user'

// Expose public functions
global.onOpen = formUtilities.onOpen
global.onInstall = formUtilities.onInstall
global.showConfiguration = formUtilities.showConfiguration
global.respondToFormSubmit = formUtilities.respondToFormSubmit
global.getSupportedFormQuestions = formUtilities.getSupportedFormQuestions
global.getConfiguration = formUtilities.getConfiguration
global.updateConfiguration = formUtilities.updateConfiguration

/* Trigger Functions */
global.adjustFormSubmitTrigger = triggerFunctions.adjustFormSubmitTrigger

/* User Functions */
global.getCurrentUser = userFunctions.getCurrentUser
global.getUser = userFunctions.getUser
global.createUser = userFunctions.createUser
