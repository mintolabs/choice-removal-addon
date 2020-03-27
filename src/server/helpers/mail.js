import { SUPPORT_EMAIL, EMAIL_TEXTS } from '../config/constants'

/**
 * Called when the user needs to reauthorize. Sends the user of the
 * add-on an email explaining the need to reauthorize and provides
 * a link for the user to do so. Capped to send at most one email
 * a day to prevent spamming the users of the add-on.
 */
export const sendReauthorizationRequest = () => {
  const settings = PropertiesService.getDocumentProperties()
  const authInfo = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL)
  const lastAuthEmailDate = settings.getProperty('lastAuthEmailDate')
  const today = new Date().toDateString()
  if (lastAuthEmailDate !== today) {
    if (MailApp.getRemainingDailyQuota() > 0) {
      const template = HtmlService.createTemplateFromFile('AuthorizationEmail')
      template.url = authInfo.getAuthorizationUrl()
      template.addonName = process.env.ADDON_NAME
      const message = template.evaluate()
      MailApp.sendEmail(
        Session.getEffectiveUser().getEmail(),
        'Authorization Required',
        message.getContent(),
        {
          name: process.env.ADDON_NAME,
          htmlBody: message.getContent(),
        }
      )
    }
    settings.setProperty('lastAuthEmailDate', today)
  }
}

/**
 * Send welcome email to users using their own Gmail
 */
export const sendWelcomeEmail = userEmail => {
  if (MailApp.getRemainingDailyQuota() > 0) {
    const template = HtmlService.createTemplateFromFile('WelcomeEmail')

    const message = template.evaluate()
    MailApp.sendEmail(userEmail, EMAIL_TEXTS.WELCOME_EMAIL_SUBJECT, message.getContent(), {
      name: process.env.ADDON_NAME,
      htmlBody: message.getContent(),
      replyTo: SUPPORT_EMAIL,
    })
  }
}
