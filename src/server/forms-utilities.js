// Use ES6/7 code
import { DEFAULT_BACKUP_TEXT, PREFIXES } from './config/constants'
import { sendReauthorizationRequest, sendWelcomeEmail } from './helpers/mail'
import { createUser } from './models/user'
import { getConfiguration } from './models/configuration'

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

  const email = Session.getEffectiveUser().getEmail()

  console.log(`Started onInstall for user ${email}`)

  // Send welcome email to user
  sendWelcomeEmail(email)

  // Create user immediately after installing the addon
  createUser()

  console.log(`Finished onInstall for user ${email}`)
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

export const handleMultipleChoiceQuestion = (item, answer, configuration, questionConfigKey) => {
  if (!item) {
    return
  }

  const choiceTotal = configuration[questionConfigKey].choices[answer].total
  const choiceSelected = configuration[questionConfigKey].choices[answer].selected
  if (
    configuration[questionConfigKey].choices &&
    configuration[questionConfigKey].choices[answer] &&
    choiceSelected >= choiceTotal - 1
  ) {
    const currentChoices = item
      .asMultipleChoiceItem()
      .getChoices()
      .map(choice => choice.getValue())
    const newChoices = currentChoices.filter(choice => choice !== answer)

    if (newChoices.length === 0) {
      item.asMultipleChoiceItem().setChoiceValues([DEFAULT_BACKUP_TEXT])
    } else {
      item.asMultipleChoiceItem().setChoiceValues(newChoices)
    }
  } else {
    // Add 1 to selected here
  }
}

export const handleListQuestion = (item, answer, configuration, questionConfigKey) => {
  if (!item) {
    return
  }

  const choiceTotal = configuration[questionConfigKey].choices[answer].total
  const choiceSelected = configuration[questionConfigKey].choices[answer].selected

  if (
    configuration[questionConfigKey].choices &&
    configuration[questionConfigKey].choices[answer] &&
    choiceSelected >= choiceTotal - 1
  ) {
    const currentChoices = item
      .asListItem()
      .getChoices()
      .map(choice => choice.getValue())
    const newChoices = currentChoices.filter(choice => choice !== answer)

    if (newChoices.length === 0) {
      item.asListItem().setChoiceValues([DEFAULT_BACKUP_TEXT])
    } else {
      item.asListItem().setChoiceValues(newChoices)
    }
  } else {
    // Add 1 to selected here
  }
}

export const handleCheckboxQuestion = (item, answersArray, configuration, questionConfigKey) => {
  if (!item) {
    return
  }

  const removeItems = []

  answersArray.forEach(answer => {
    const choiceTotal = configuration[questionConfigKey].choices[answer].total
    const choiceSelected = configuration[questionConfigKey].choices[answer].selected

    if (choiceSelected >= choiceTotal - 1) {
      removeItems.push(answer)
    }
  })

  const currentChoices = item
    .asCheckboxItem()
    .getChoices()
    .map(choice => choice.getValue())
  const newChoices = currentChoices.filter(choice => !removeItems.includes(choice))

  if (newChoices.length === 0) {
    item.asCheckboxItem().setChoiceValues([DEFAULT_BACKUP_TEXT])
  } else {
    item.asCheckboxItem().setChoiceValues(newChoices)
  }
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
      const questionConfigKey = `${PREFIXES.QUESTION_ID}${response.itemId}`

      if (configuration[questionConfigKey] && configuration[questionConfigKey].enabled) {
        switch (response.itemType) {
          case FormApp.ItemType.MULTIPLE_CHOICE:
            handleMultipleChoiceQuestion(item, response.answer, configuration, questionConfigKey)
            break
          case FormApp.ItemType.LIST:
            handleListQuestion(item, response.answer, configuration, questionConfigKey)
            break
          case FormApp.ItemType.CHECKBOX:
            handleCheckboxQuestion(item, response.answer, configuration, questionConfigKey)
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
