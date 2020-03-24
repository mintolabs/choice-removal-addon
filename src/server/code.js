import * as formUtilities from './forms-utilities'
import * as triggerFunctions from './helpers/trigger'

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
