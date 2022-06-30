import AsyncStorage from '@react-native-async-storage/async-storage'

import { LocalStorageKeys } from '../../constants'
import { Onboarding as OnboardingState, Credential as CredentialState, State } from '../../types/state'

enum OnboardingDispatchAction {
  ONBOARDING_UPDATED = 'onboarding/onboardingStateLoaded',
  DID_COMPLETE_TUTORIAL = 'onboarding/didCompleteTutorial',
  DID_AGREE_TO_TERMS = 'onboarding/didAgreeToTerms',
  DID_CREATE_PIN = 'onboarding/didCreatePin',
}

enum ErrorDispatchAction {
  ERROR_ADDED = 'error/errorAdded',
  ERROR_REMOVED = 'error/errorRemoved',
}

enum LoadingDispatchAction {
  LOADING_ENABLED = 'loading/loadingEnabled',
  LOADING_DISABLED = 'loading/loadingDisabled',
}

export type DispatchAction =
  | OnboardingDispatchAction
  | ErrorDispatchAction
  | LoadingDispatchAction

export const DispatchAction = {
  ...OnboardingDispatchAction,
  ...ErrorDispatchAction,
  ...LoadingDispatchAction,
}

export interface ReducerAction {
  type: DispatchAction
  payload?: Array<any>
}

const reducer = (state: State, action: ReducerAction): State => {
  switch (action.type) {
    case OnboardingDispatchAction.ONBOARDING_UPDATED: {
      const onboarding: OnboardingState = (action?.payload || []).pop()
      return {
        ...state,
        onboarding,
      }
    }
    case OnboardingDispatchAction.DID_COMPLETE_TUTORIAL: {
      const onboarding = {
        ...state.onboarding,
        didCompleteTutorial: true,
      }
      const newState = {
        ...state,
        onboarding,
      }
      AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding))
      return newState
    }
    case OnboardingDispatchAction.DID_AGREE_TO_TERMS: {
      const onboarding: OnboardingState = {
        ...state.onboarding,
        didAgreeToTerms: true,
      }
      const newState = {
        ...state,
        onboarding,
      }
      AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding))
      return newState
    }
    case OnboardingDispatchAction.DID_CREATE_PIN: {
      const onboarding: OnboardingState = {
        ...state.onboarding,
        didCreatePIN: true,
      }
      const newState = {
        ...state,
        onboarding,
      }
      AsyncStorage.setItem(LocalStorageKeys.Onboarding, JSON.stringify(newState.onboarding))
      return newState
    }
    case ErrorDispatchAction.ERROR_ADDED: {
      const { error } = (action?.payload || []).pop()
      return {
        ...state,
        error,
      }
    }
    case ErrorDispatchAction.ERROR_REMOVED: {
      return {
        ...state,
        error: null,
      }
    }
    case LoadingDispatchAction.LOADING_ENABLED: {
      return {
        ...state,
        loading: true,
      }
    }
    case LoadingDispatchAction.LOADING_DISABLED: {
      return {
        ...state,
        loading: false,
      }
    }
    default:
      return state
  }
}

export default reducer
