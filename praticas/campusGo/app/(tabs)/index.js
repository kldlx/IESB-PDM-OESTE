
import { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import useNotices from '../../hooks/useNotices';
import FadeIn from '../../components/FadeIn';
import { api } from '../../services/api';

export default function HomeScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [feedback, setFeedback] = useState('');

  async function handleCreateNotice() {
    if (!title.trim() || !body.trim()) {
      setFeedback('Preencha o título e a descrição do aviso.');
      return;
    }

    try {
      setIsPublishing(true);
      setFeedback('');

      const createdNotice = await api.create('/posts', {
        title: title.trim(),
        body: body.trim(),
        userId: 1,
      });

      setFeedback(
        `Aviso enviado com sucesso! ID retornado pela API: ${createdNotice.id}.`
      );

      setTitle('');
      setBody('');
      Keyboard.dismiss();
    } catch (err) {
      console.error('Erro ao publicar aviso:', err);
      setFeedback('Não foi possível publicar o aviso. Tente novamente.');
    } finally {
      setIsPublishing(false);
    }
  }

  function renderNotice({ item, index }) {
    return (
      <FadeIn delay={index * 80}>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>{item.title}</Text>
          <Text style={styles.noticeBody}>{item.body}</Text>
          <Text style={styles.noticeFooter}>
            Aviso acadêmico #{item.id}
          </Text>
        </View>
      </FadeIn>
    );
  }

  function renderHeader() {
    return (
      <>
        <View style={styles.header}>
          <Text style={styles.welcome}>Olá, estudante!</Text>
          <Text style={styles.subtitle}>
            Confira as novidades do seu ambiente acadêmico.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mural de avisos</Text>
          <Text style={styles.sectionSubtitle}>
            Comunicados e atualizações
          </Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Publicar novo aviso</Text>

          <TextInput
            style={styles.input}
            placeholder="Título do aviso"
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
            returnKeyType="next"
            blurOnSubmit={false}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do aviso"
            placeholderTextColor="#94A3B8"
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
            maxLength={500}
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <Pressable
            style={[
              styles.publishButton,
              isPublishing && styles.disabledButton,
            ]}
            onPress={handleCreateNotice}
            disabled={isPublishing}
          >
            <Text style={styles.publishButtonText}>
              {isPublishing ? 'Publicando...' : 'Publicar aviso'}
            </Text>
          </Pressable>

          {feedback ? (
            <Text style={styles.feedback}>{feedback}</Text>
          ) : null}
        </View>
      </>
    );
  }

  function renderEmpty() {
    if (isLoading) {
      return (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>
            Carregando avisos...
          </Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContent}>
          <Text style={styles.errorTitle}>
            Ops! Algo deu errado.
          </Text>
          <Text style={styles.errorText}>{error}</Text>

          <Pressable style={styles.retryButton} onPress={reload}>
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      );
    }

    return (
      <View style={styles.centerContent}>
        <Text style={styles.emptyText}>
          Nenhum aviso disponível no momento.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={notices}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderNotice}
        ListHeaderComponent={renderHeader()}
        ListEmptyComponent={renderEmpty()}
        ListFooterComponent={
          error && notices.length > 0 ? (
            <Text style={styles.updateError}>
              Não foi possível atualizar os avisos. Tente novamente.
            </Text>
          ) : null
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        removeClippedSubviews={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={reload}
            colors={['#2563EB']}
            tintColor="#2563EB"
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  list: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 30,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#DBEAFE',
    marginTop: 7,
    lineHeight: 21,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 14,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 18,
    padding: 18,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  formTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 14,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#0F172A',
    marginBottom: 12,
  },
  textArea: {
    minHeight: 85,
  },
  publishButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  feedback: {
    color: '#1D4ED8',
    fontSize: 13,
    marginTop: 12,
    lineHeight: 19,
  },
  listContent: {
    paddingBottom: 30,
    flexGrow: 1,
  },
  noticeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  noticeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E293B',
    textTransform: 'capitalize',
    lineHeight: 23,
  },
  noticeBody: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 21,
    marginTop: 9,
  },
  noticeFooter: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '600',
    marginTop: 14,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  loadingText: {
    color: '#64748B',
    marginTop: 12,
    fontSize: 14,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#DC2626',
    marginBottom: 8,
  },
  errorText: {
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 21,
  },
  retryButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 18,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#64748B',
    textAlign: 'center',
  },
  updateError: {
    color: '#DC2626',
    textAlign: 'center',
    fontSize: 13,
    paddingVertical: 12,
  },
});
