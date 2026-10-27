import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ExpensesProvider } from "./src/store/expenses-context";
import { Colors } from "./src/constants/theme";
import DespesasRecentes from "./src/screens/DespesasRecentes";
import TodasDespesas from "./src/screens/TodasDespesas";
import GerenciarDespesa from "./src/screens/GerenciarDespesa";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const theme = Colors.light;

function DespesasTabs() {
  return (
    <Tab.Navigator
      initialRouteName="TodasDespesas"
      screenOptions={({ route }) => ({
        headerShown: true,
        headerStyle: {
          backgroundColor: "#2563EB",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "700",
          color: "#FFFFFF",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          height: 64,
          paddingTop: 7,
          paddingBottom: 7,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
        tabBarIcon: ({ color, size, focused }) => {
          const iconName =
            route.name === "TodasDespesas"
              ? focused
                ? "list"
                : "list-outline"
              : focused
                ? "time"
                : "time-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: "Recentes",
          tabBarLabel: "Recentes",
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: "Todas as despesas",
          tabBarLabel: "Todas",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ExpensesProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.surface,
            },
            headerTintColor: theme.primary,
            headerTitleStyle: {
              fontWeight: "700",
              color: theme.text,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: theme.background,
            },
          }}
        >
          <Stack.Screen name="Despesas" options={{ headerShown: false }}>
            {() => <DespesasTabs />}
          </Stack.Screen>
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{ title: "Nova despesa" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesProvider>
  );
}
