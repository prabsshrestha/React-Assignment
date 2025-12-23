export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'transport'
  | 'entertainment'
  | 'utilities'
  | 'shopping'
  | 'health'
  | 'other';

export const EXPENSE_CATEGORIES: { value: ExpenseCategory; label: string; }[] = [
  { value: 'food', label: 'Food & Dining'},
  { value: 'food', label: 'Food & Dining'},
  { value: 'transport', label: 'Transport'},
  { value: 'entertainment', label: 'Entertainment'},
  { value: 'utilities', label: 'Utilities'},
  { value: 'shopping', label: 'Shopping'},
  { value: 'health', label: 'Health'},
  { value: 'other', label: 'Other'},
];
