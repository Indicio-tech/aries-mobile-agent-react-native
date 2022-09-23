import { CredentialExchangeRecord as CredentialRecord } from '@aries-framework/core'

import { BifoldError } from './error'

export interface Onboarding {
  didCompleteTutorial: boolean
  didAgreeToTerms: boolean
  didCreateDisplayName: boolean
  didCreatePIN: boolean
  didConsiderBiometry: boolean
}

export interface Preferences {
  useBiometry: boolean
}

export interface User {
  firstName: string
  lastName: string
}

// FIXME: Once hooks are updated this should no longer be necessary
export interface Credential {
  revoked: Set<CredentialRecord['id']>
  revokedMessageDismissed: Set<CredentialRecord['id']>
}

export interface Privacy {
  didShowCameraDisclosure: boolean
}

export interface State {
  onboarding: Onboarding
  credential: Credential
  privacy: Privacy
  preferences: Preferences
  user: User
  error: BifoldError | null
  loading: boolean
}
