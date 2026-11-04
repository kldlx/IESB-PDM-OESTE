import { Platform, Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function getImageUri(asset) {
  if (Platform.OS === 'web' && asset.base64) {
    return `data:image/jpeg;base64,${asset.base64}`;
  }

  return asset.uri;
}

export async function pickImage() {
  const permission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permissão necessária',
      'Precisamos acessar sua galeria para selecionar uma foto.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );

    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    base64: true,
  });

  if (result.canceled) {
    return null;
  }

  return getImageUri(result.assets[0]);
}

export async function takePhoto() {
  const permission =
    await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert(
      'Permissão necessária',
      'Precisamos acessar sua câmera para tirar uma foto.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
      ]
    );

    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.8,
    base64: true,
  });

  if (result.canceled) {
    return null;
  }

  return getImageUri(result.assets[0]);
}