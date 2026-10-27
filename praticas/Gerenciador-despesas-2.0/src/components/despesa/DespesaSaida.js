
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Categories } from '../../constants/theme';

const theme = {
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#DBEAFE',
  danger: '#DC2626',
  overlay: 'rgba(15, 23, 42, 0.45)',
};

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function parseDate(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);

  if (!match) {
    return null;
  }

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  date.setHours(12, 0, 0, 0);
  return date;
}

export default function DespesaSaida({
  initialValues,
  onSubmit,
  onCancel,
  onDelete,
  isEditing = false,
}) {
  const initialDate = initialValues?.date
    ? formatDate(new Date(`${initialValues.date}T12:00:00`))
    : formatDate(new Date());

  const [values, setValues] = useState({
    description: initialValues?.description ?? '',
    amount:
      initialValues?.amount != null
        ? String(initialValues.amount)
        : '',
    date: initialDate,
    category: initialValues?.category ?? '',
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    parseDate(initialDate) ?? new Date()
  );

  function handleChange(field, value) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: '',
    }));
  }

  function validate() {
    const nextErrors = {};
    const description = values.description.trim();
    const amount = Number(values.amount.replace(',', '.'));
    const date = parseDate(values.date);

    if (description.length < 3) {
      nextErrors.description =
        'A descrição deve ter pelo menos 3 caracteres.';
    }

    if (!values.amount.trim() || !Number.isFinite(amount) || amount <= 0) {
      nextErrors.amount = 'Informe um valor maior que zero.';
    }

    if (!date) {
      nextErrors.date = 'Informe uma data válida no formato dd/mm/aaaa.';
    } else {
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      if (date > today) {
        nextErrors.date = 'A data não pode ser futura.';
      }
    }

    if (!values.category) {
      nextErrors.category = 'Selecione uma categoria.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleSave() {
    if (!validate()) {
      return;
    }

    const date = parseDate(values.date);
    const amount = Number(values.amount.replace(',', '.'));

    onSubmit({
      description: values.description.trim(),
      amount,
      date: `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
      category: values.category,
    });
  }

  function handleAmountChange(value) {
    const normalized = value.replace(',', '.');

    if (/^\d*\.?\d{0,2}$/.test(normalized)) {
      handleChange('amount', normalized);
    }
  }

  function handleDateChange(event, date) {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      date.setHours(12, 0, 0, 0);
      setSelectedDate(date);
      handleChange('date', formatDate(date));
    }
  }

  function handleConfirmDelete() {
    setShowDeleteModal(false);
    onDelete?.();
  }

  const selectedCategory = Categories.find(
    (category) => category.id === values.category
  );

  const inputStyle = (field) => [
    styles.input,
    {
      borderColor: errors[field] ? theme.danger : theme.border,
    },
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          value={values.description}
          onChangeText={(value) => handleChange('description', value)}
          placeholder="Ex.: Compra no supermercado"
          placeholderTextColor={theme.textSecondary}
          style={inputStyle('description')}
          maxLength={100}
          accessibilityLabel="Descrição da despesa"
        />
        {errors.description ? (
          <Text style={styles.error}>{errors.description}</Text>
        ) : null}

        <Text style={styles.label}>Valor (R$)</Text>
        <TextInput
          value={values.amount}
          onChangeText={handleAmountChange}
          placeholder="0.00"
          placeholderTextColor={theme.textSecondary}
          keyboardType="decimal-pad"
          style={inputStyle('amount')}
          accessibilityLabel="Valor da despesa"
        />
        {errors.amount ? (
          <Text style={styles.error}>{errors.amount}</Text>
        ) : null}

        <Text style={styles.label}>Data</Text>
        <View style={styles.dateRow}>
          <TextInput
            value={values.date}
            onChangeText={(value) => handleChange('date', value)}
            placeholder="dd/mm/aaaa"
            placeholderTextColor={theme.textSecondary}
            keyboardType="numeric"
            style={[inputStyle('date'), styles.dateInput]}
            maxLength={10}
            accessibilityLabel="Data da despesa"
          />
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Calendário</Text>
          </Pressable>
        </View>
        {errors.date ? (
          <Text style={styles.error}>{errors.date}</Text>
        ) : null}

        {showDatePicker ? (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        ) : null}

        <Text style={styles.label}>Categoria</Text>
        <Pressable
          onPress={() => setShowCategoryModal(true)}
          style={[
            inputStyle('category'),
            styles.categorySelector,
          ]}
          accessibilityRole="button"
        >
          <Text
            style={{
              color: selectedCategory ? theme.text : theme.textSecondary,
            }}
          >
            {selectedCategory
              ? `${selectedCategory.icon} ${selectedCategory.label}`
              : 'Selecione uma categoria'}
          </Text>
        </Pressable>
        {errors.category ? (
          <Text style={styles.error}>{errors.category}</Text>
        ) : null}

        <View style={styles.actions}>
          <Pressable
            onPress={handleSave}
            style={styles.actionButton}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>
              {isEditing ? 'Salvar alterações' : 'Adicionar despesa'}
            </Text>
          </Pressable>

          <Pressable
            onPress={onCancel}
            style={styles.secondaryButton}
            accessibilityRole="button"
          >
            <Text style={styles.secondaryButtonText}>Cancelar</Text>
          </Pressable>

          {isEditing && onDelete ? (
            <Pressable
              onPress={() => setShowDeleteModal(true)}
              style={styles.deleteButton}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>Excluir despesa</Text>
            </Pressable>
          ) : null}
        </View>
      </ScrollView>

      <Modal
        visible={showDeleteModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmTitle}>Excluir despesa</Text>
            <Text style={styles.confirmMessage}>
              Tem certeza de que deseja excluir esta despesa? Essa ação não
              pode ser desfeita.
            </Text>

            <View style={styles.confirmActions}>
              <Pressable
                onPress={() => setShowDeleteModal(false)}
                style={styles.confirmCancelButton}
                accessibilityRole="button"
              >
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmDelete}
                style={styles.confirmDeleteButton}
                accessibilityRole="button"
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showCategoryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCategoryModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha uma categoria</Text>

            {Categories.map((category) => (
              <Pressable
                key={category.id}
                onPress={() => {
                  handleChange('category', category.id);
                  setShowCategoryModal(false);
                }}
                style={styles.categoryOption}
              >
                <Text style={styles.categoryText}>
                  {category.icon} {category.label}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => setShowCategoryModal(false)}
              style={styles.actionButton}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scroll: {
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
    paddingBottom: 36,
    backgroundColor: '#FFFFFF',
  },
  label: {
    color: '#1E293B',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 7,
  },
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#DBEAFE',
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
    paddingHorizontal: 13,
    justifyContent: 'center',
    fontSize: 15,
  },
  error: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 5,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateInput: {
    flex: 1,
  },
  dateButton: {
    minHeight: 48,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
  },
  actions: {
    gap: 10,
    marginTop: 28,
  },
  actionButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  secondaryButton: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  secondaryButtonText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  deleteButton: {
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categorySelector: {
    justifyContent: 'center',
  },
  confirmOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  confirmContent: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    padding: 22,
    backgroundColor: '#FFFFFF',
  },
  confirmTitle: {
    color: '#1E293B',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 12,
  },
  confirmMessage: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 10,
  },
  confirmCancelButton: {
    flex: 1,
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  confirmDeleteButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  modalContent: {
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 22,
    paddingBottom: 32,
    backgroundColor: '#FFFFFF',
  },
  modalTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  categoryOption: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DBEAFE',
  },
  categoryText: {
    color: '#1E293B',
    fontSize: 16,
  },
});
