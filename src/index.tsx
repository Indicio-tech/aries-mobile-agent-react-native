import React, { createContext, ReactNode, useEffect } from 'react'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'


interface BifoldProviderProps {
  children: ReactNode
}

export interface BifoldContext {

}

export const BifoldContext = createContext<BifoldContext>({})

const BifoldProvider: React.FC<BifoldProviderProps> = ({children}) => {
  useEffect(() => {

    // The following setup should go in the translations.ts file:

    // Check if i18next has already been initialized by the application, if not, initialize--this is for apps that don't use i18next
    if(!i18next.isInitialized){
      await i18next.use(initReactI18next).init({
        debug: true,
        lng: 'en',
        fallbackLng: 'en',
        resources:{},
      })
    }

    // Add a resource bundle for Aries Bifold
    console.log(i18next.isInitialized) // remove please


    // Should be in en.ts file, etc and imported. From here to...
    const AriesBifoldGlobals = {
      credential: 'credential'
    }

    const AriesBifoldResource = {
      AriesBifoldGlobals: AriesBifoldGlobals,
      ContactItem: {
        title: 'hello',
        referenceGlobal: AriesBifoldGlobals.credential 
      }
    }

    // ...likely here

    await i18next.use(initReactI18next).addResourceBundle('en', 'aries-bifold', AriesBifoldResource)

  }, [])


  return(
    <BifoldContext.Provider
      value={{
        
      }}
    >
      <>
      {children}
      </>
    </BifoldContext.Provider>
  )
}

export default BifoldProvider