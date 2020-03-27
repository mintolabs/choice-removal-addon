import { connectDatabase } from '../db/firestore'
import { COLLECTIONS, PLANS, USER_STATUSES } from '../config/constants'

export const getUser = email => {
  const db = connectDatabase()

  const userData = db.getDocument(`${COLLECTIONS.USERS}/${email}`)

  if (!userData || !userData.fields) {
    return null
  }

  return userData.fields
}

export const getCurrentUser = () => {
  const user = Session.getEffectiveUser()

  const db = connectDatabase()

  const userData = db.getDocument(`${COLLECTIONS.USERS}/${user.getEmail()}`)

  if (!userData || !userData.fields) {
    return null
  }

  return userData.fields
}

export const getUserEmail = () => Session.getEffectiveUser().getEmail()

export const createUser = () => {
  try {
    const user = Session.getEffectiveUser()

    const db = connectDatabase()

    // Store the create time
    const now = new Date().toISOString()

    db.createDocument(`${COLLECTIONS.USERS}/${user.getEmail()}`, {
      email: user.getEmail(),
      plan: PLANS.FREE,
      status: USER_STATUSES.ACTIVATED,
      inviteBonus: 0,
      numberInvites: 0,
      createTime: now,
      updatedTime: now,
    })
  } catch (err) {
    console.error(err)
  }
}
