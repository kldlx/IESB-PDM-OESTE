
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const router = useRouter();

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [place, setPlace] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [completionMessage, setCompletionMessage] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const scale = useSharedValue(0);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  async function handleCheckIn() {
    try {
      setIsLoadingLocation(true);

      const currentPlace = await getCurrentPlace();

      if (!currentPlace) {
        Alert.alert(
          'Permissão necessária',
          'Ative a permissão de localização para registrar onde você estudou.'
        );
        return;
      }

      setPlace(currentPlace.label);
    } catch (error) {
      console.error('Erro ao obter localização:', error);

      Alert.alert(
        'Erro de localização',
        'Não foi possível identificar sua localização. Tente novamente.'
      );
    } finally {
      setIsLoadingLocation(false);
    }
  }

  async function handleReminder() {
    try {
      setIsScheduling(true);
      setNotificationMessage('');

      const notificationId = await scheduleReminder(
        'Lembrete de estudos',
        10
      );

      if (!notificationId) {
        setNotificationMessage(
          'Permissão de notificações não concedida.'
        );
        return;
      }

      setNotificationMessage(
        'Lembrete agendado! Você receberá uma notificação em 10 segundos.'
      );
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
      setNotificationMessage(
        'Não foi possível agendar o lembrete neste dispositivo.'
      );
    } finally {
      setIsScheduling(false);
    }
  }

  async function handleCompleteTask() {
    try {
      await Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
      );
    } catch (error) {
      console.error('Erro no feedback tátil:', error);
    }

    setCompletionMessage('Tarefa concluída com sucesso!');
    setIsCompleted(true);

    scale.value = 0;
    scale.value = withSequence(
      withSpring(1.3, {
        damping: 5,
        stiffness: 180,
      }),
      withSpring(1, {
        damping: 8,
        stiffness: 150,
      })
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator
    >
      <Text style={styles.title}>Minhas tarefas</Text>

      <Text style={styles.description}>
        Gerencie suas atividades acadêmicas.
      </Text>

      <Pressable
        style={styles.button}
        onPress={() => router.push('/new-task')}
      >
        <Text style={styles.buttonText}>+ Nova tarefa</Text>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push('/task/42')}
      >
        <Text style={styles.secondaryButtonText}>Abrir tarefa 42</Text>
      </Pressable>

      <View style={styles.checkInCard}>
        <Text style={styles.checkInTitle}>Registro de estudos</Text>

        <Text style={styles.checkInDescription}>
          Registre o local onde você está estudando.
        </Text>

        <Pressable
          style={styles.locationButton}
          onPress={handleCheckIn}
          disabled={isLoadingLocation}
        >
          {isLoadingLocation ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.locationButtonText}>Estudei aqui</Text>
          )}
        </Pressable>

        {place && (
          <View style={styles.locationResult}>
            <Text style={styles.locationLabel}>Local registrado:</Text>
            <Text style={styles.locationText}>{place}</Text>
          </View>
        )}
      </View>

      <View style={styles.checkInCard}>
        <Text style={styles.checkInTitle}>Lembretes</Text>

        <Text style={styles.checkInDescription}>
          Receba um lembrete para conferir suas atividades acadêmicas.
        </Text>

        <Pressable
          style={styles.locationButton}
          onPress={handleReminder}
          disabled={isScheduling}
        >
          {isScheduling ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.locationButtonText}>Lembrar em 10 s</Text>
          )}
        </Pressable>

        {notificationMessage !== '' && (
          <Text style={styles.notificationMessage}>
            {notificationMessage}
          </Text>
        )}
      </View>

      <View style={styles.checkInCard}>
        <Text style={styles.checkInTitle}>Finalização</Text>

        <Text style={styles.checkInDescription}>
          Finalize uma atividade e receba um feedback de sucesso.
        </Text>

        <Pressable
          style={styles.completeButton}
          onPress={handleCompleteTask}
        >
          <Text style={styles.locationButtonText}>Concluir tarefa</Text>
        </Pressable>

        {completionMessage !== '' && (
          <View style={styles.completionContainer}>
            <Animated.View
              style={[styles.successIcon, animatedIconStyle]}
            >
              <Text style={styles.successIconText}>✓</Text>
            </Animated.View>

            <Text style={styles.completionMessage}>
              {completionMessage}
            </Text>
          </View>
        )}
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  description: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#EFF6FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#1D4ED8',
    fontSize: 15,
    fontWeight: 'bold',
  },
  checkInCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 24,
  },
  checkInTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  checkInDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 7,
    marginBottom: 18,
  },
  locationButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  locationResult: {
    backgroundColor: '#EFF6FF',
    padding: 14,
    borderRadius: 10,
    marginTop: 16,
  },
  locationLabel: {
    color: '#1D4ED8',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  locationText: {
    color: '#334155',
    fontSize: 14,
    lineHeight: 20,
  },
  notificationMessage: {
    color: '#334155',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 14,
  },
  completeButton: {
    backgroundColor: '#16A34A',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completionContainer: {
    alignItems: 'center',
    marginTop: 18,
  },
  successIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#DCFCE7',
    borderWidth: 2,
    borderColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIconText: {
    fontSize: 34,
    color: '#16A34A',
    fontWeight: 'bold',
  },
  completionMessage: {
    color: '#15803D',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'center',
  },
});
