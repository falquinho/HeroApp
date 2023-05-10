import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { CustomText } from '../components/CustomText'
import { CustomTitle } from '../components/CustomTitle'
import { Colors } from '../shared/colors'
import { Spacing } from '../shared/spacing'
import { CharacterDetailsScreenProps } from './CharacterDetailsScreen'


export const BackRow: React.FC<{
  navigation: CharacterDetailsScreenProps['navigation'],
}> = ({
  navigation,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <CustomText style={styles.backText}>{"< Voltar"}</CustomText>
      </TouchableOpacity>
    </View>
  );
}


export const TitleRow: React.FC<{title: string}> = ({
  title
}) => {
  return (
    <View style={[styles.container, styles.borderBottom]}>
      <CustomTitle style={styles.nameText}>
        {title}
      </CustomTitle>
    </View>
  )
}


export const InfoRow: React.FC<{label: string, info: string}> = ({
  label,
  info,
}) => {
  return(
    <View style={[styles.container, styles.borderBottom]}>
      <CustomText style={styles.labelText}>
        {label}
      </CustomText>
      <CustomText style={styles.infoText}>
        {info}
      </CustomText>
    </View>
  )
}


export const ThumbnailComponent: React.FC<{
  path: string,
  extension: string,
}> = ({
  path,
  extension,
}) => {
  return (
    <Image
      source={{ uri: `${path.replace('http', 'https')}/landscape_incredible.${extension}` }}
      style={styles.thumbnail}
    />
  )
}


const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.offWhite,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
  },
  nameText: {
    fontSize: 26,
    lineHeight: 48,
  },
  backText: {
    color: Colors.primary,
    fontSize: 18,
  },
  labelText: {
    fontSize: 16,
    color: Colors.grayDark,
  },
  infoText: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primary,
    marginLeft: Spacing.lg,
    marginTop: Spacing.sm,
  },
  thumbnail: {
    resizeMode: 'cover',
    height: 350,
    width: '100%',
    backgroundColor: Colors.gray,
  },
  shadow: {
    shadowColor: Colors.grayDark,
    shadowOpacity: 0.6,
    textShadowRadius: 4,
  }
});