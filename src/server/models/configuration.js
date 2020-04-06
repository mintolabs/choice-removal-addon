import { PREFIXES } from '../config/constants'
import { adjustFormSubmitTrigger } from '../helpers/trigger'

export const getConfiguration = () => {
  const documentProperties = PropertiesService.getDocumentProperties()
  const properties = documentProperties.getProperties()
  const configuration = {}

  Object.keys(properties).forEach(key => {
    if (key.includes(PREFIXES.QUESTION_ID)) {
      configuration[key] = JSON.parse(properties[key])
    }
  })

  return configuration
}

export const getQuestionConfigByKey = key => {
  const documentProperties = PropertiesService.getDocumentProperties()
  const config = documentProperties.getProperty(key)
    ? JSON.parse(documentProperties.getProperty(key))
    : null

  return config
}

export const updateQuestionConfigByKey = (key, config) => {
  const documentProperties = PropertiesService.getDocumentProperties()
  documentProperties.setProperty(key, JSON.stringify(config))
}

export const removeQuestionConfigByKey = key => {
  const documentProperties = PropertiesService.getDocumentProperties()
  documentProperties.deleteProperty(key)
}

export const removeChoiceConfig = (key, choice) => {
  const config = getQuestionConfigByKey(key)

  if (!config) {
    return
  }

  if (!config.choices || !config.choices[choice]) {
    return
  }

  delete config.choices[choice]
  updateQuestionConfigByKey(key, config)
}

function showAlert(owner) {
  const ui = FormApp.getUi()

  ui.alert(
    'Only the first user who configured these settings can change it',
    `Please ask ${owner} to modify these settings`,
    ui.ButtonSet.OK
  )
}

export const updateConfiguration = (questionId, checked) => {
  const documentProperties = PropertiesService.getDocumentProperties()
  const properties = documentProperties.getProperties()
  const owner = properties[PREFIXES.OWNER]
  const userEmail = Session.getEffectiveUser().getEmail()

  // Prevent users who are not the owner to modify the configuration
  // This will prevent duplicate form trigger
  if (owner && owner !== userEmail) {
    return showAlert(owner)
  }

  if (!owner) {
    documentProperties.setProperty(PREFIXES.OWNER, Session.getEffectiveUser().getEmail())
  }

  const key = `${PREFIXES.QUESTION_ID}${questionId}`
  const configurationString = properties[key]
  const configuration = configurationString ? JSON.parse(configurationString) : {}

  const form = FormApp.getActiveForm()
  const item = form.getItemById(questionId)

  if (!item) {
    return getConfiguration()
  }

  const itemType = item.getType()
  let choices = []

  switch (itemType) {
    case FormApp.ItemType.MULTIPLE_CHOICE:
      choices = item
        .asMultipleChoiceItem()
        .getChoices()
        .map(choice => choice.getValue())
      break
    case FormApp.ItemType.LIST:
      choices = item
        .asListItem()
        .getChoices()
        .map(choice => choice.getValue())
      break
    case FormApp.ItemType.CHECKBOX:
      choices = item
        .asCheckboxItem()
        .getChoices()
        .map(choice => choice.getValue())
      break
    default:
      break
  }

  configuration.enabled = checked

  if (checked && choices.length > 0) {
    choices.forEach(choice => {
      configuration.choices = {
        ...configuration.choices,
        [choice]: {
          total: 1,
          selected: 0,
        },
      }
    })
  } else {
    delete configuration.choices
  }

  documentProperties.setProperty(key, JSON.stringify(configuration))

  adjustFormSubmitTrigger()

  return getConfiguration()
}
