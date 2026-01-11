import { memo } from "react";
import { EXPENSE_CATEGORIES, type Expense } from "../../types/expense";
import { useApp } from "../../context/AppContext";
import { Trash2 } from "lucide-react";

const ExpenseItem = memo(function ExpenseItem({
  expense,
}: {
  expense: Expense;
}) {
  const { deleteExpense } = useApp();
  const category = EXPENSE_CATEGORIES.find((c) => c.value === expense.category);

  return (
    <div className="expense-item">
      <div>
        <strong>{expense.title}</strong>
        <div className="expense-meta">
          <span>{category?.label}</span>
          <span>{new Date(expense.date).toDateString()}</span>
        </div>
      </div>

      <div className="expense-right">
        <span>
          Rs.&nbsp;
          {new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(expense.amount)}
        </span>
        <button
          className="delete-btn"
          onClick={() => deleteExpense(expense.id)}
          aria-label="Delete expense"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
});

export function ExpenseList({
  expenses,
  currency,
}: {
  expenses: Expense[];
  currency: string;
}) {
  if (expenses.length === 0) {
    return <p>No expenses yet.</p>;
  }

  return (
    <div className="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </div>
  );
}
