import * as formUtilities from './forms-utilities'
import * as triggerFunctions from './helpers/trigger'
import * as userFunctions from './models/user'
import * as configurationFunctions from './models/configuration'

// Expose public functions
global.onOpen = formUtilities.onOpen
global.onInstall = formUtilities.onInstall
global.showConfiguration = formUtilities.showConfiguration
global.respondToFormSubmit = formUtilities.respondToFormSubmit
global.getSupportedFormQuestions = formUtilities.getSupportedFormQuestions

/* Trigger Functions */
global.adjustFormSubmitTrigger = triggerFunctions.adjustFormSubmitTrigger

/* User Functions */
global.getCurrentUser = userFunctions.getCurrentUser
global.getUser = userFunctions.getUser
global.createUser = userFunctions.createUser

/* Configuration Functions */
global.getConfiguration = configurationFunctions.getConfiguration
global.updateConfiguration = configurationFunctions.updateConfiguration
