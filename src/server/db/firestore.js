import firestoreCredentialsProd from '../config/yace-firestore-serviceAccount'
import firestoreCredentialsDev from '../config/yace-bound-firestore-serviceAccount'

let firestoreCredentials

if (process.env.ENVIRONMENT === 'production') {
  firestoreCredentials = firestoreCredentialsProd
} else {
  firestoreCredentials = firestoreCredentialsDev
}

export const connectDatabase = () =>
  FirestoreApp.getFirestore(
    firestoreCredentials.client_email,
    firestoreCredentials.private_key,
    firestoreCredentials.project_id
  )
