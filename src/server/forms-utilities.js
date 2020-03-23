// Use ES6/7 code
import { sendReauthorizationRequest } from './helpers/mail'

export const onOpen = e => {
  const menu = FormApp.getUi().createAddonMenu()

  if (e && e.authMode === ScriptApp.AuthMode.NONE) {
    // Add Get Started menu item (works in all authorization modes).
    menu.addItem('Configuration', 'showConfiguration')
  } else {
    menu.addItem('Configuration', 'showConfiguration')
  }

  menu.addToUi()
}

export const onInstall = e => {
  onOpen(e)
}

export const showConfiguration = () => {
  const ui = HtmlService.createHtmlOutputFromFile('Configuration').setTitle(
    `${process.env.ADDON_NAME}`
  )
  FormApp.getUi().showSidebar(ui)
}

export const getSupportedFormQuestions = () => {
  const items = FormApp.getActiveForm().getItems()
  return items
    .filter(
      item =>
        item.getType() === FormApp.ItemType.MULTIPLE_CHOICE ||
        item.getType() === FormApp.ItemType.LIST ||
        item.getType() === FormApp.ItemType.CHECKBOX
    )
    .map(item => ({
      id: item.getId(),
      title: item.getTitle(),
      type: item.getType(),
    }))
}

/**
 * Responds to a form submission event if an onFormSubmit trigger has been
 * enabled.
 *
 * @param {Object} e The event parameter created by a form
 *      submission; see
 *      https://developers.google.com/apps-script/understanding_events
 * @return {boolean}
 */
export const respondToFormSubmit = () => {
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL)

  // Check if the actions of the trigger require authorizations that have not
  // been supplied yet -- if so, warn the active user via email (if possible).
  // This check is required when using triggers with add-ons to maintain
  // functional triggers.
  if (authInfo.getAuthorizationStatus() === ScriptApp.AuthorizationStatus.REQUIRED) {
    // Re-authorization is required. In this case, the user needs to be alerted
    // that they need to reauthorize; the normal trigger action is not
    // conducted, since authorization needs to be provided first. Send at
    // most one 'Authorization Required' email a day, to avoid spamming users
    // of the add-on.
    return sendReauthorizationRequest()
  }

  try {
    console.log('Test from YACE')
  } catch (err) {
    console.error(err.message)
  }

  return false
}
