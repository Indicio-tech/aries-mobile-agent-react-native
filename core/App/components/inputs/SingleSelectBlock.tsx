import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useTheme } from '../../contexts/theme'
import Text from '../texts/Text'

export interface BlockSelection {
  value: string
  id: string
  enabled: boolean
}

interface Props {
  selection: BlockSelection[]
  onSelect: (selected: BlockSelection) => void
  initialSelect?: BlockSelection
}

const SingleSelectBlock: React.FC<Props> = ({ selection, onSelect, initialSelect }) => {
  const [selected, setSelected] = useState(initialSelect ?? selection[0])
  const { t } = useTranslation()
  const { ColorPallet, Inputs } = useTheme()
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 6,
    },
    row: {
      ...Inputs.singleSelect,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 4,
      paddingVertical: 20,
      borderRadius: 7,
      backgroundColor: ColorPallet.grayscale.veryLightGrey,
    },
    disabledText: {
      //FIX ME
      color: '#949494',
    },
  })
  const handleSelect = (selected: BlockSelection) => {
    setSelected(selected)
    onSelect(selected)
  }

  return (
    <View style={styles.container}>
      {selection.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.row}
          onPress={() => handleSelect(item)}
          disabled={item.enabled ? false : true}
        >
          <Text style={[Inputs.singleSelectText, !item.enabled && styles.disabledText]}>{item.value}</Text>
          {item.id === selected.id ? (
            <Icon name={'check'} size={25} color={Inputs.singleSelectIcon.color} />
          ) : (
            <Text style={styles.disabledText}>{t('Language.Disabled')}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default SingleSelectBlock
