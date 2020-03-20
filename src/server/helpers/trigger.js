/**
 * Adjust the onFormSubmit trigger based on user's requests.
 *
 */
export const adjustFormSubmitTrigger = () => {
  const form = FormApp.getActiveForm()
  const triggers = ScriptApp.getUserTriggers(form)

  // Create a new trigger if required; delete existing trigger
  //   if it is not needed.
  let existingTrigger = null
  for (let i = 0; i < triggers.length; i += 1) {
    if (triggers[i].getEventType() === ScriptApp.EventType.ON_FORM_SUBMIT) {
      existingTrigger = triggers[i]
      break
    }
  }

  // TODO: Optimize this later, at the moment it's for cleaning up trigger in case of error
  if (existingTrigger) {
    ScriptApp.deleteTrigger(existingTrigger)
  }

  ScriptApp.newTrigger('respondToFormSubmit')
    .forForm(form)
    .onFormSubmit()
    .create()
}
