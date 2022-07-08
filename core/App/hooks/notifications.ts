import { CredentialRecord, CredentialState, ProofRecord, ProofState } from '@aries-framework/core'
import { useCredentialByState, useProofByState } from '@aries-framework/react-hooks'

interface Notifications {
  total: number
  notifications: Array<CredentialRecord | ProofRecord>
}

export function useNotifications(): Notifications {
  const offers = useCredentialByState(CredentialState.OfferReceived)
  const proofs = useProofByState(ProofState.RequestReceived)
  const revoked = useCredentialByState(CredentialState.Done).filter((credential: CredentialRecord) => {
    if (credential.revocationNotification !== undefined && credential.metadata.ackRevoked !== true) {return credential}
  })

  const notifications = [...offers, ...proofs, ...revoked].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return { total: notifications.length, notifications }
}
