import { Filter, X, Calendar, Tag } from "lucide-react";
import { EXPENSE_CATEGORIES, type ExpenseCategory } from "../../types/expense";

interface ExpenseFilterProps {
  category: ExpenseCategory | "all";
  date: string;
  onCategoryChange: (value: ExpenseCategory | "all") => void;
  onDateChange: (value: string) => void;
  onClear: () => void;
}

export function ExpenseFilter({
  category,
  date,
  onCategoryChange,
  onDateChange,
  onClear,
}: ExpenseFilterProps) {
  const hasActiveFilters = category !== "all" || date !== "";

  return (
    <div className="expense-filter-card">
      <div className="filter-header">
        <Filter size={16} />
        <span>Filters</span>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label>Category</label>
          <div className="filter-input">
            <Tag size={16} />
            <select
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none"
              value={category}
              onChange={(e) =>
                onCategoryChange(e.target.value as ExpenseCategory | "all")
              }
            >
              <option value="all">All Categories</option>
              {EXPENSE_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label>Date</label>
          <div className="filter-input">
            <Calendar size={16} />
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button className="filter-clear" onClick={onClear}>
            <X size={14} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
