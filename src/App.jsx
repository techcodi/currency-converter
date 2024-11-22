import { useState } from "react";

import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState();
  const [loading, setLoading] = useState();

  const handleConverter = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
      );
      const data = await res.json();

      console.log(data);
      setConverted(data.rates[toCur]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    if (fromCur === toCur) return setConverted(amount);
  };
  return (
    <div className="app">
      <div className="app-container">
        <h1>Currency Converter</h1>
        <div className="selections">
          <div>
            <label htmlFor="from">from</label>
            <select id="from" onChange={(e) => setFromCur(e.target.value)}>
              <option value="EUR">EUR</option>
              <option value="AUD">AUD</option>
              <option value="USD">USD</option>
              <option value="CAD">CAD</option>
              <option value="BGN">BGN</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="SEK">SEK</option>
            </select>
          </div>
          <div>
            <label htmlFor="toCur">to:</label>
            <select id="toCur" onChange={(e) => setToCur(e.target.value)}>
              <option value="USD">USD</option>
              <option value="AUD">AUD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="BGN">BGN</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="SEK">SEK</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div class="loader"></div>
        ) : (
          <p>
            {converted} {toCur}
          </p>
        )}
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleConverter}>Convert</button>
      </div>
    </div>
  );
}

export default App;
