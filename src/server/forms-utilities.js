// Use ES6/7 code
import { adjustFormSubmitTrigger } from './helpers/trigger'
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

export const getConfiguration = () => {
  const documentProperties = PropertiesService.getDocumentProperties()
  const configurationString = documentProperties.getProperty('configuration')

  const configuration = configurationString ? JSON.parse(configurationString) : null

  return configuration
}

export const updateConfiguration = (questionId, checked) => {
  const documentProperties = PropertiesService.getDocumentProperties()
  const configurationString = documentProperties.getProperty('configuration')

  const configuration = configurationString ? JSON.parse(configurationString) : {}

  configuration[questionId] = checked

  documentProperties.setProperty('configuration', JSON.stringify(configuration))

  adjustFormSubmitTrigger()

  return configuration
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
export const respondToFormSubmit = e => {
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
    const form = e.source

    const itemResponses = e.response.getItemResponses()
    const responses = itemResponses
      .filter(
        response =>
          response.getItem().getType() === FormApp.ItemType.MULTIPLE_CHOICE ||
          response.getItem().getType() === FormApp.ItemType.LIST ||
          response.getItem().getType() === FormApp.ItemType.CHECKBOX
      )
      .map(response => ({
        itemId: response.getItem().getId(),
        itemType: response.getItem().getType(),
        answer: response.getResponse(), // With multiple choice and list items, the result is String. With checkbox item, the result is String[]
      }))

    const configuration = getConfiguration()

    if (!configuration) {
      return true
    }

    for (let i = 0; i < responses.length; i += 1) {
      const response = responses[i]
      const item = form.getItemById(response.itemId)

      if (configuration[response.itemId]) {
        switch (response.itemType) {
          case FormApp.ItemType.MULTIPLE_CHOICE:
            if (item) {
              const currentChoices = item
                .asMultipleChoiceItem()
                .getChoices()
                .map(choice => choice.getValue())
              const newChoices = currentChoices.filter(choice => choice !== response.answer)
              console.log(item.getTitle(), newChoices)
              item.asMultipleChoiceItem().setChoiceValues(newChoices)
            }
            break
          case FormApp.ItemType.LIST:
            if (item) {
              const currentChoices = item
                .asListItem()
                .getChoices()
                .map(choice => choice.getValue())
              const newChoices = currentChoices.filter(choice => choice !== response.answer)
              console.log(item.getTitle(), newChoices)
              item.asListItem().setChoiceValues(newChoices)
            }
            break
          case FormApp.ItemType.CHECKBOX:
            if (item) {
              const currentChoices = item
                .asCheckboxItem()
                .getChoices()
                .map(choice => choice.getValue())
              const newChoices = currentChoices.filter(choice => !response.answer.includes(choice))
              console.log(item.getTitle(), newChoices)
              item.asCheckboxItem().setChoiceValues(newChoices)
            }
            break
          default:
            break
        }
      }
    }
  } catch (err) {
    console.error(err)
  }

  return true
}
