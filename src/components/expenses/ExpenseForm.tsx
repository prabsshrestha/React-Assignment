import { useState, useCallback } from "react";
import { Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { EXPENSE_CATEGORIES, type ExpenseCategory } from "../../types/expense";
import { useApp } from "../../context/AppContext";

interface FormData {
  title: string;
  amount: string;
  category: ExpenseCategory | "";
  date: string;
}

interface FormErrors {
  title?: string;
  amount?: string;
  category?: string;
  date?: string;
}

const initialFormData: FormData = {
  title: "",
  amount: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
};

export function ExpenseForm() {
  const { addExpense } = useApp();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";

    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Enter a valid amount greater than 0";
    }

    if (!formData.category) newErrors.category = "Select a category";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addExpense({
      title: formData.title.trim(),
      amount: parseFloat(formData.amount),
      category: formData.category as ExpenseCategory,
      date: formData.date,
    });

    toast.success("Expense added successfully!");
    setFormData(initialFormData);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <div className="expense-card">
      <h2 className="expense-title">
        <Plus size={20} /> Add New Expense
      </h2>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="form-group">
          <label>Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Grocery shopping"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0.00"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Select category</option>
            {EXPENSE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn primary">
            <Plus size={16} /> Add Expense
          </button>

          <button type="button" className="btn outline" onClick={handleReset}>
            <RotateCcw size={16} /> Reset
          </button>
        </div>
      </form>
    </div>
  );
}
