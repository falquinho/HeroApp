import React from 'react'
import { View } from 'react-native'


export type SpacerProps = {
  size?: number,
}

export const Spacer: React.FC<SpacerProps> = ({
  size = 0,
}) => {
  return (
    <View style={{width: size, height: size}}/>
  )
}