import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { pickImage, takePhoto } from '../../services/media';

const STORAGE_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  useFocusEffect(
    useCallback(() => {
      async function loadPhoto() {
        try {
          const storedPhoto = await AsyncStorage.getItem(STORAGE_KEY);
          setPhotoUri(storedPhoto);
        } catch (error) {
          console.error('Erro ao carregar foto:', error);
        } finally {
          setIsLoading(false);
        }
      }

      loadPhoto();
    }, [])
  );

  async function savePhoto(uri) {
    if (!uri) {
      return;
    }

    try {
      await AsyncStorage.setItem(STORAGE_KEY, uri);
      setPhotoUri(uri);
      setShowOptions(false);
    } catch (error) {
      console.error('Erro ao salvar foto:', error);
    }
  }

  async function handleGallery() {
    try {
      const uri = await pickImage();
      await savePhoto(uri);
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
    }
  }

  async function handleCamera() {
    try {
      const uri = await takePhoto();
      await savePhoto(uri);
    } catch (error) {
      console.error('Erro ao tirar foto:', error);
    }
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Meu perfil</Text>
      <Text style={styles.subtitle}>
        Gerencie suas informações pessoais.
      </Text>

      <View style={styles.profileCard}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <Pressable
            style={styles.avatarContainer}
            onPress={() => setShowOptions(!showOptions)}
          >
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>+</Text>
              </View>
            )}
          </Pressable>
        )}

        <Text style={styles.name}>Estudante CampusGo</Text>
        <Text style={styles.description}>
          Seu espaço acadêmico em um só lugar.
        </Text>

        <Pressable
          style={styles.photoButton}
          onPress={() => setShowOptions(!showOptions)}
          disabled={isLoading}
        >
          <Text style={styles.photoButtonText}>
            Alterar foto de perfil
          </Text>
        </Pressable>

        {showOptions && (
          <View style={styles.optionsContainer}>
            <Pressable style={styles.optionButton} onPress={handleGallery}>
              <Text style={styles.optionText}>Escolher da galeria</Text>
            </Pressable>

            <Pressable style={styles.optionButton} onPress={handleCamera}>
              <Text style={styles.optionText}>Tirar uma foto</Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setShowOptions(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        )}
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Sobre o CampusGo</Text>
        <Text style={styles.infoText}>
          Organize suas tarefas, acompanhe suas despesas e fique por dentro
          dos avisos acadêmicos.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#DBEAFE',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  avatarText: {
    fontSize: 42,
    color: '#2563EB',
    fontWeight: '300',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    textAlign: 'center',
  },
  photoButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 10,
    marginTop: 20,
  },
  photoButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  optionText: {
    color: '#1D4ED8',
    fontWeight: '600',
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#64748B',
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 20,
  },
  infoTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
  },
});