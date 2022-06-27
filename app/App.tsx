import {
  AgentProvider,
  ConfigurationContext,
  ConfigurationProvider,
  StoreProvider,
  ThemeProvider,
  theme,
  initLanguages,
  initStoredLanguage,
  translationResources,
  ErrorModal,
  toastConfig,
  RootStack,
  OnboardingPages,
  Splash,
  Terms,
} from "aries-bifold";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Toast from "react-native-toast-message";

import { Agent, JsonTransformer, V2CredentialService } from '@aries-framework/core'
import { W3cCredential } from "@aries-framework/core/build/modules/vc/models";
import { SignCredentialOptionsRFC0593 } from "@aries-framework/core/build/modules/vc/models/W3cCredentialServiceOptions";
import { JsonLdCredentialFormatService } from "@aries-framework/core/build/modules/credentials/formats/jsonld/JsonLdCredentialFormatService";
import { KeyType } from "@aries-framework/core/build/crypto";
import { DidKey } from "@aries-framework/core/build/modules/dids";
require('react-native-securerandom');
const crypto = require('isomorphic-webcrypto');
const canonize = require('rdf-canonize');
console.log("App - crypto:", crypto)
console.log("App - crypto.subtle:", crypto.subtle)
const defaultConfiguration: ConfigurationContext = {
  pages: OnboardingPages,
  splash: Splash,
  terms: Terms,
};

import BLSDemo from './BLSDemo'

initLanguages(translationResources);

const App = () => {
  initStoredLanguage();
  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  useEffect(() => {
    // Hide the native splash / loading screen so that our
    // RN version can be displayed.
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    if(agent){
      console.log("APP - Agent initialized")
      //w3cJsonLdCredentialTest()
    }
  }, [agent])

  const w3cJsonLdCredentialTest = async () => {
    if(!agent) return
    
    const w3cCredService = agent.credentials.w3cCredentialService

    const seed = 'testseed000000000000000000000061'
    console.log(`APP - Seed: `, seed)
    const key = await w3cCredService.wallet.createKey({ keyType: KeyType.Bls12381g2, seed })
    const issuerDidKey = new DidKey(key)
    console.log(`APP - Created Key`)
    console.log(`APP - DidKey: `, issuerDidKey.did)

    const verificationMethod = `${issuerDidKey.did}#${issuerDidKey.key.fingerprint}`
    console.log(`APP - Verification method: `, verificationMethod)

    // const LD_INPUT_DOC = {
    //   "@context": [
    //       "https://www.w3.org/2018/credentials/v1",
    //       "https://www.w3.org/2018/credentials/examples/v1",
    //       "https://w3id.org/security/bbs/v1"
    //   ],
    //   "type": [
    //       "VerifiableCredential",
    //       "UniversityDegreeCredential",
    //   ],
    //   "issuer": issuerDidKey.did,
    //   "issuanceDate": "2019-12-03T12:19:52Z",
    //   "credentialSubject": {
    //       "degree": {
    //           "type": "BachelorDegree",
    //           "name": "Bachelor of Science and Arts",
    //       }
    //   },
    // }

    const LD_DOC_BBSBLS = {
      '@context': ['https://www.w3.org/2018/credentials/v1', 'https://w3id.org/citizenship/v1', 'https://w3id.org/security/bbs/v1'],
      id: 'https://issuer.oidp.uscis.gov/credentials/83627465',
      type: ['VerifiableCredential', 'PermanentResidentCard'],
      issuer: issuerDidKey.did,
      identifier: '83627465',
      name: 'Permanent Resident Card',
      description: 'Government of Example Permanent Resident Card.',
      issuanceDate: '2019-12-03T12:19:52Z',
      expirationDate: '2029-12-03T12:19:52Z',
      credentialSubject: {
        id: 'did:example:b34ca6cd37bbf23',
        type: ['PermanentResident', 'Person'],
        givenName: 'JOHN',
        familyName: 'SMITH',
        gender: 'Male',
        image: 'data:image/png;base64,iVBORw0KGgokJggg==',
        residentSince: '2015-01-01',
        lprCategory: 'C09',
        lprNumber: '999-999-999',
        commuterClassification: 'C1',
        birthCountry: 'Bahamas',
        birthDate: '1958-07-17',
      },
    }
    
    const credential = JsonTransformer.fromJSON(LD_DOC_BBSBLS, W3cCredential)

    const vc = await w3cCredService.signCredential({
      credential,
      proofType: 'BbsBlsSignature2020',
      verificationMethod: verificationMethod,
    })

    console.log(`APP - W3C Credential`, vc)
    
    // agent.credentials.w3cCredentialService.

    // let agentTyped: Agent = agent
    // if(agentTyped){
    //   console.log("APP - Agent is typed")
    //   let jsonLdCredentialFormatService:V2CredentialService = agentTyped.credentials.getService('v2')
    // }

    // agent.credentials.proposeCredential({
    //   connectionId: ,
    //   protocolVersion: "v2",
    //   credentialFormats: {
    //     jsonld: signCredentialOptions
    //   },
    //   comment: 'v2 propose credential test for W3C Credentials'
    // })

    // agent.credentials.offerCredential({
    //   credentialFormats: {
    //     jsonld: signCredentialOptions
    //   },
    //   protocolVersion: 'v2'
    // })
  }

  return (
    <StoreProvider>
      <AgentProvider agent={agent}>
        <ThemeProvider value={theme}>
          <ConfigurationProvider value={defaultConfiguration}>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor={theme.ColorPallet.brand.primary}
              translucent={false}
            />
            <ErrorModal />
            <BLSDemo />
            <RootStack setAgent={setAgent} />
            <Toast topOffset={15} config={toastConfig} />
          </ConfigurationProvider>
        </ThemeProvider>
      </AgentProvider>
    </StoreProvider>
  );
};

export default App;