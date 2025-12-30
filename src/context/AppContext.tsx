import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { Expense } from "../types/expense";

interface AppState {
  expenses: Expense[];
  temperatureUnit: "celsius" | "fahrenheit";
  currency: string;
}

type AppAction =
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "DELETE_EXPENSE"; payload: string }
  | { type: "SET_EXPENSES"; payload: Expense[] }
  | { type: "TOGGLE_TEMPERATURE_UNIT" }
  | { type: "SET_CURRENCY"; payload: string };

interface AppContextType {
  state: AppState;
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
  toggleTemperatureUnit: () => void;
  setCurrency: (currency: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = "finance-dashboard-data";

function loadFromStorage(): Partial<AppState> {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to load from localStorage:", e);
  }
  return {};
}

function saveToStorage(state: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
  }
}

const initialState: AppState = {
  expenses: [],
  temperatureUnit: "celsius",
  currency: "USD",
  ...loadFromStorage(),
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "ADD_EXPENSE":
      return { ...state, expenses: [action.payload, ...state.expenses] };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((e) => e.id !== action.payload),
      };
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    case "TOGGLE_TEMPERATURE_UNIT":
      return {
        ...state,
        temperatureUnit:
          state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius",
      };
    case "SET_CURRENCY":
      return { ...state, currency: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    saveToStorage(state);
  }, [state]);

  const addExpense = useCallback((expense: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    dispatch({ type: "ADD_EXPENSE", payload: newExpense });
  }, []);

  const deleteExpense = useCallback((id: string) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  }, []);

  const toggleTemperatureUnit = useCallback(() => {
    dispatch({ type: "TOGGLE_TEMPERATURE_UNIT" });
  }, []);

  const setCurrency = useCallback((currency: string) => {
    dispatch({ type: "SET_CURRENCY", payload: currency });
  }, []);

  const value = useMemo(
    () => ({
      state,
      addExpense,
      deleteExpense,
      toggleTemperatureUnit,
      setCurrency,
    }),
    [state, addExpense, deleteExpense, toggleTemperatureUnit, setCurrency]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
