
import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [conversionRate, setConversionRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencyList, setCurrencyList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '84890defbf3d9a780afbc011'; // API key
  const apiUrl = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.result === 'success') {
          setCurrencyList(Object.keys(data.conversion_rates));
          setConversionRate(data.conversion_rates[toCurrency]);
          setConvertedAmount((amount * data.conversion_rates[toCurrency]).toFixed(2));
        } else {
          setError('Failed to fetch conversion rates');
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [fromCurrency, toCurrency, amount, apiUrl]);

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <div>
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0"
        />
        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        to
        <select value={toCurrency} onChange={handleToCurrencyChange}>
          {currencyList.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      {loading && <p>Loading conversion rates...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {conversionRate && !loading && !error && (
        <p>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;




// import React, { useState, useEffect } from 'react';

// const CurrencyConverter = ({ transactions }) => {
//   const [rates, setRates] = useState({});
//   const [baseCurrency, setBaseCurrency] = useState('USD');
//   const [targetCurrency, setTargetCurrency] = useState('EUR');
//   const [convertedAmount, setConvertedAmount] = useState(0);
//   const API_KEY = '84890defbf3d9a780afbc011'; // Replace with your API key

//   useEffect(() => {
//     fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`)
//       .then((res) => res.json())
//       .then((data) => setRates(data.conversion_rates))
//       .catch((error) => console.error('Error fetching exchange rates:', error));
//   }, [baseCurrency]);

//   const convertCurrency = () => {
//     const totalAmount = transactions.reduce((acc, transaction) => {
//       return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
//     }, 0);

//     if (rates[targetCurrency]) {
//       setConvertedAmount((totalAmount * rates[targetCurrency]).toFixed(2));
//     }
//   };

//   return (
//     <div>
//       <h3>Convert Balance</h3>
//       <label>
//         Base Currency:
//         <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
//           {Object.keys(rates).map((currency) => (
//             <option key={currency} value={currency}>{currency}</option>
//           ))}
//         </select>
//       </label>

//       <label>
//         Target Currency:
//         <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
//           {Object.keys(rates).map((currency) => (
//             <option key={currency} value={currency}>{currency}</option>
//           ))}
//         </select>
//       </label>

//       <button onClick={convertCurrency}>Convert</button>

//       {convertedAmount !== 0 && (
//         <h4>Converted Balance: {convertedAmount} {targetCurrency}</h4>
//       )}
//     </div>
//   );
// };

// export default CurrencyConverter;
