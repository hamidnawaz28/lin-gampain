import { getApp, getApps, initializeApp } from 'firebase/app'
import firebaseConfig from '../utils/config/upwork-gpt-firebase.json'

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

export default app
