import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();

export default function App() {
  const [despesas, setDespesas] = useState([
    {
      id: 1,
      descricao: 'Almoço',
      valor: 35.5,
      categoria: 'Alimentação',
      data: new Date().toISOString(),
    },
    {
      id: 2,
      descricao: 'Uber',
      valor: 18.75,
      categoria: 'Transporte',
      data: new Date().toISOString(),
    },
    {
      id: 3,
      descricao: 'Cinema',
      valor: 45,
      categoria: 'Lazer',
      data: new Date().toISOString(),
    },
  ]);

  function adicionarDespesa(novaDespesa) {
    setDespesas((despesasAtuais) => [
      ...despesasAtuais,
      novaDespesa,
    ]);
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TodasDespesas"
          options={{ title: 'Todas as Despesas' }}
        >
          {(props) => (
            <TodasDespesas
              {...props}
              despesas={despesas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="DespesasRecentes"
          options={{ title: 'Despesas Recentes' }}
        >
          {(props) => (
            <DespesasRecentes
              {...props}
              despesas={despesas}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="GerenciarDespesa"
          options={{ title: 'Gerenciar Despesa' }}
        >
          {(props) => (
            <GerenciarDespesa
              {...props}
              onAdicionarDespesa={adicionarDespesa}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}