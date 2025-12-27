import { TrendingUp, Cloud, Receipt, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-wrapper fade-in">
      <section className="hero">
        <div className="badge">
          <TrendingUp size={16} />
          <span>Personal Finance & Weather Dashboard</span>
        </div>

        <h1 className="hero-title">
          Take Control of Your
          <span>Financial Future</span>
        </h1>

        <p className="hero-subtitle">
          Track your expenses, monitor spending patterns, and stay informed
          about the weather.
        </p>
      </section>

      <section className="features">
        <div className="feature-grid">
          {/* Expense Card */}
          <div className="card">
            <div className="icon-box primary">
              <Receipt size={28} />
            </div>

            <h3>Expense Tracker</h3>
            <p>
              Keep track of your daily expenses with categories, filters, and
              detailed summaries.
            </p>

            <Link to="/expenses" className="card-link">
              Start tracking <ArrowRight size={16} />
            </Link>
          </div>

          {/* Weather Card */}
          <div className="card">
            <div className="icon-box accent">
              <Cloud size={28} />
            </div>

            <h3>Weather Updates</h3>
            <p>
              Get real-time weather information for any city. Plan your day with
              accurate temperature, humidity, and wind data.
            </p>

            <Link to="/weather" className="card-link accent-link">
              Check weather <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
