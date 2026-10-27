
export const Colors = {
  light: {
    primary: '#2563EB',
    primaryLight: '#EFF6FF',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#1E293B',
    textSecondary: '#64748B',
    border: '#DBEAFE',
    danger: '#DC2626',
    dangerLight: '#FEF2F2',
    success: '#16A34A',
    tabBar: '#FFFFFF',
    tabBarInactive: '#94A3B8',
    overlay: 'rgba(30, 41, 59, 0.45)',
  },
  dark: {
    primary: '#60A5FA',
    primaryLight: '#1E3A5F',
    background: '#0F172A',
    surface: '#1E293B',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    danger: '#F87171',
    dangerLight: '#451A1A',
    success: '#4ADE80',
    tabBar: '#1E293B',
    tabBarInactive: '#94A3B8',
    overlay: 'rgba(0, 0, 0, 0.65)',
  },
};

export const Categories = [
  { id: 'alimentacao', label: 'Alimentação', icon: '🍔' },
  { id: 'transporte', label: 'Transporte', icon: '🚗' },
  { id: 'lazer', label: 'Lazer', icon: '🎮' },
  { id: 'contas', label: 'Contas', icon: '🏠' },
  { id: 'outros', label: 'Outros', icon: '📦' },
];

export const getCategoryLabel = (categoryId) => {
  const category = Categories.find((item) => item.id === categoryId);
  return category ? category.label : 'Outros';
};
