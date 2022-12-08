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
    if(!i18next.isInitialized){
      await i18next.use(initReactI18next).init({
        debug: true,
        lng: 'en',
        fallbackLng: 'en',
        resources:{},
      })
    }


    console.log(i18next.isInitialized)
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