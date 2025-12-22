import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import NotFound from "./pages/NotFound";
import Expenses from "./pages/Expense";
import { Layout } from "./components/layout/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/weather" element={<Weather />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
