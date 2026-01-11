import { useMemo } from "react";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import type { Expense } from "../../types/expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const stats = useMemo(() => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const today = new Date();
    const monthlyTotal = expenses
      .filter((exp) => {
        const d = new Date(exp.date);
        return (
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, exp) => sum + exp.amount, 0);

    const average = expenses.length > 0 ? total / expenses.length : 0;

    return {
      total,
      monthlyTotal,
      average,
      count: expenses.length,
    };
  }, [expenses]);

  const formatCurrency = (amount: number) =>
    `Rs. ${new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)}`;

  return (
    <div className="summary-grid">
      <div className="summary-card">
        <div className="summary-inner">
          <div className="summary-content">
            <p className="summary-label">Total Expenses</p>
            <p className="summary-value">{formatCurrency(stats.total)}</p>
            <p className="summary-subtext">{stats.count} transactions</p>
          </div>
          <div className="summary-icon-wrapper blue">
            <DollarSign className="summary-icon" />
          </div>
        </div>
      </div>

      <div className="summary-card">
        <div className="summary-inner">
          <div className="summary-content">
            <p className="summary-label">This Month</p>
            <p className="summary-value">
              {formatCurrency(stats.monthlyTotal)}
            </p>
            <p className="summary-subtext">Current month spending</p>
          </div>
          <div className="summary-icon-wrapper red">
            <TrendingUp className="summary-icon" />
          </div>
        </div>
      </div>

      {/* Average Expense */}
      <div className="summary-card">
        <div className="summary-inner">
          <div className="summary-content">
            <p className="summary-label">Average Expense</p>
            <p className="summary-value">{formatCurrency(stats.average)}</p>
            <p className="summary-subtext">Per transaction</p>
          </div>
          <div className="summary-icon-wrapper green">
            <Calendar className="summary-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}
