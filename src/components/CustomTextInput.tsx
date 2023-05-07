import React from 'react'
import { StyleSheet, TextInputProps, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { CustomText } from './CustomText'


type CustomTextInputProps = TextInputProps & {
  label?: string,
}

export const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const {label, style} = props

  return (
    <View>
      {!!label && (
        <CustomText style={styles.label}>
          {label}
        </CustomText>
      )}
      <TextInput {...props} style={[styles.input, style]}/>
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    color: Colors.primary,
    lineHeight: 19,
  },
  input: {
    height: 31,
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 4,
    paddingHorizontal: 4,
  },
});