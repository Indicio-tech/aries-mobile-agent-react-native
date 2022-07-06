/* eslint-disable prettier/prettier */
// TO DO: State and functionality, state styling, and research question and answer


import React from 'react'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Button, { ButtonType } from "../../../components/buttons/Button"
import { useTheme } from '../../../contexts/theme'

const QuestionAnswer = () => {
    const { t } = useTranslation()
    const { ColorPallet, Inputs, ListItems, borderRadius, ChatTheme } = useTheme()
    const [choice, setChoice] = useState([
        { name: 'I need a new credential', key: '1' },
        { name: 'I already have a credential', key: '2' },
        { name: 'What is a credential?', key: '3' },
])

    const styles = StyleSheet.create({
        container: {
            padding: 15
        },
        containerText: {
            marginBottom: 12
        },
        choice: {
            backgroundColor: ColorPallet.grayscale.veryLightGrey,
            marginBottom: 12
        },
        text: {
            color: ColorPallet.grayscale.black,
            fontSize: 16,
            fontWeight: '400',
            textAlign: 'center'
        },
        button: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            marginTop: 3
        }
  })

  return (
    <>
    <View style={[ChatTheme.leftBubble, styles.container]}>
        <Text style={[ChatTheme.leftText, styles.containerText]}>Please select an answer below.</Text>
        <FlatList
            data={choice}
            renderItem={({ item }) => (
                <>
                <TouchableOpacity style={[Inputs.singleSelect, styles.choice]} onPress={() => {console.log(item)}}>
                <Text style={styles.text}>{item.name}</Text>
                </TouchableOpacity>
                </>
            )}
        />
        <View style={styles.button}>
        <Button
        title={t('Global.Confirm')}
        buttonType={ButtonType.Primary}
        ></Button>
        </View>
    </View>
    </>
  )
}

export default QuestionAnswer