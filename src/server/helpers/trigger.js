/**
 * Adjust the onFormSubmit trigger based on user's requests.
 *
 */
export const adjustFormSubmitTrigger = () => {
  const form = FormApp.getActiveForm()
  const triggers = ScriptApp.getUserTriggers(form)

  const documentProperties = PropertiesService.getDocumentProperties()
  const triggerNeeded = documentProperties.getProperty('configuration') !== null

  // Create a new trigger if required; delete existing trigger
  //   if it is not needed.
  let existingTrigger = null

  for (let i = 0; i < triggers.length; i += 1) {
    if (triggers[i].getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT) {
      existingTrigger = triggers[i]
      break
    }
  }

  if (triggerNeeded && !existingTrigger) {
    ScriptApp.newTrigger('respondToFormSubmit')
      .forForm(form)
      .onFormSubmit()
      .create()
  } else if (!triggerNeeded && existingTrigger) {
    ScriptApp.deleteTrigger(existingTrigger)
  }
}
