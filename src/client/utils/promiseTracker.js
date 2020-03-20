import { trackPromise } from 'react-promise-tracker'

export const promiseTrackerWrapped = (fn, ...args) => trackPromise(fn(...args))
