export const defaultLanguage = 'en'

// Used to property prefix TestIDs so they can be looked up
// by on-device automated testing systems like SauceLabs.
export const testIdPrefix = 'com.ariesbifold:id/'

// App name used for generating invites / connections
export const myLabel = 'Aries Bifold'

export enum LocalStorageKeys {
  Onboarding = 'OnboardingState',
  // FIXME: Once hooks are updated this should no longer be necessary
  RevokedCredentials = 'RevokedCredentials',
  RevokedCredentialsMessageDismissed = 'RevokedCredentialsMessageDismissed',
  User = 'UserState',
  AppVersion = 'AppVersion',
}

export enum KeychainServices {
  Salt = 'secret.wallet.salt',
  Key = 'secret.wallet.key',
}

export const walletId = 'walletId'

export const dateFormatOptions: { year: 'numeric'; month: 'short'; day: 'numeric' } = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
}

export const dateLocale: string = 'en-US'

export const minPINLength = 6

export const dateAttributes: String[] = [
  'verified_at'
]