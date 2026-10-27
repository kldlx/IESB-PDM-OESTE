
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext();

const STORAGE_KEY = '@expenses';

const initialState = {
  expenses: [],
};

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        expenses: action.payload,
      };

    case 'ADD':
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
      };

    case 'UPDATE':
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };

    case 'DELETE':
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

export function ExpensesProvider({ children }) {
  const [state, dispatch] = useReducer(expensesReducer, initialState);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadExpenses() {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedExpenses !== null) {
          const parsedExpenses = JSON.parse(storedExpenses);

          if (Array.isArray(parsedExpenses)) {
            dispatch({
              type: 'SET',
              payload: parsedExpenses,
            });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    }

    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function saveExpenses() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(state.expenses)
        );
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    }

    saveExpenses();
  }, [state.expenses, isLoaded]);

  function addExpense(expenseData) {
    dispatch({
      type: 'ADD',
      payload: {
        ...expenseData,
        id: Date.now().toString(),
      },
    });
  }

  function updateExpense(id, expenseData) {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...expenseData,
        id,
      },
    });
  }

  function deleteExpense(id) {
    dispatch({
      type: 'DELETE',
      payload: id,
    });
  }

  const value = {
    expenses: state.expenses,
    addExpense,
    updateExpense,
    deleteExpense,
    isLoaded,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error(
      'useExpenses deve ser utilizado dentro de ExpensesProvider.'
    );
  }

  return context;
}
