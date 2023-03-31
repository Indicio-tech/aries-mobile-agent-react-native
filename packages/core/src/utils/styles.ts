import { ColorValue, StyleSheet } from "react-native"

export interface IconStyle {
  color?: ColorValue
  size?: number
}

/**
 * Takes in default styles and applies override styles, but only the sub-styles changed, example:
 * const default styles = {
 *  outerContainer: {
 *    backgroundColor: 'red',
 *    marginTop: 15,
 *  },
 *  textContainer: {
 *    flexDirection: 'column',
 *    alignItems: 'flex-start',
 *  },
 * }
 * const overrideStyles = {
 *  outerContainer: {
 *    backgroundColor: 'green'
 *  }
 * }
 * appliedStyles = {
 *  outerContainer: {
 *    backgroundColor: 'green',
 *    marginTop: 15,
 *  },
 *  textContainer: {
 *    flexDirection: 'column',
 *    alignItems: 'flex-start',
 *  },
 * }
 * 
 * Additional documentation on this topic would be useful
 */
export const applyStyles = (defaultStyles: any, overrideStyles: any) => {
  let updatedStyles = defaultStyles
  let keys = Object.keys(defaultStyles)
  keys.forEach((v: string) => {
    let key = v as keyof typeof defaultStyles
    if (overrideStyles && overrideStyles?.[key]) {
      updatedStyles[key] = {
        ...defaultStyles[key],
        ...overrideStyles?.[key]
      }
    }
  })

  return StyleSheet.create(updatedStyles)
}