import { ExpenseSummary } from "../components/expenses/ExpenseSummary";
import { ExpenseForm } from "../components/expenses/ExpenseForm";
import { useApp } from "../context/AppContext";
import { useSearchParams } from "react-router-dom";
import type { ExpenseCategory } from "../types/expense";
import { useCallback, useMemo } from "react";
import { ExpenseFilter } from "../components/expenses/ExpenseFilter";
import { ExpenseList } from "../components/expenses/ExpenseList";

export default function Expenses() {
  const { state } = useApp();
  const { expenses } = state;
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter =
    (searchParams.get("category") as ExpenseCategory | "all") || "all";
  const dateFilter = searchParams.get("date") || "";

  const setCategoryFilter = useCallback(
    (value: ExpenseCategory | "all") => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (value === "all") {
          params.delete("category");
        } else {
          params.set("category", value);
        }
        return params;
      });
    },
    [setSearchParams]
  );

  const setDateFilter = useCallback(
    (value: string) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);

        if (!value) {
          params.delete("date");
        } else {
          params.set("date", value);
        }
        return params;
      });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesCategory =
        categoryFilter === "all" || expense.category === categoryFilter;
      const matchesDate = !dateFilter || expense.date === dateFilter;
      return matchesCategory && matchesDate;
    });
  }, [expenses, categoryFilter, dateFilter]);
  return (
    <div className="expenses-page">
      <div className="expenses-grid">
        {/* LEFT SIDE */}
        <div className="expenses-left">
          <ExpenseSummary expenses={expenses} />
          <ExpenseFilter
            category={categoryFilter}
            date={dateFilter}
            onCategoryChange={setCategoryFilter}
            onDateChange={setDateFilter}
            onClear={clearFilters}
          />

          <h3 className="expense-length">
            {filteredExpenses.length === expenses.length
              ? `All Expenses (${expenses.length})`
              : `Filtered Results (${filteredExpenses.length} of ${expenses.length})`}
          </h3>
          <ExpenseList expenses={filteredExpenses} />
        </div>

        {/* RIGHT SIDE */}
        <div className="expenses-right">
          <ExpenseForm />
        </div>
      </div>
    </div>
  );
}
