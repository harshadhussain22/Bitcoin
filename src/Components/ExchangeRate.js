import React, { useState, useEffect } from 'react';
import { Typography, Select, Spin, Input } from 'antd';
import { cryptocurrencies, fiatCurrencies } from './currencies/currencies.js';
import { ExchangeRateUI } from './UI/ExchangeRateUI.js';
import { useQuery } from 'react-query';
import { fetchData } from './fetchData/fetchData.js';

function ExchangeRate() {
  const [fromCurrency, setFromCurrency] = useState(cryptocurrencies[0].value);
  const [toCurrency, setToCurrency] = useState(fiatCurrencies[0].value);
  const [currencySymbol, setCurrencySymbol] = useState("Bitcoin");
  const [fromAmount, setFromAmount] = useState(1); 
  const [toAmount, setToAmount] = useState(1); // State for the amount in 'to' currency
  const [responseData, setResponseData] = useState(null); // State to hold response data

  const handleFromCurrencyChange = (value) => {
    setFromCurrency(value);
console.log(fromCurrency)
  };

  const handleToCurrencyChange = (value) => {
    setToCurrency(value);
  };

  const handleFromAmountChange = (value) => {
    setFromAmount(value);
  };

  const handleToAmountChange = (value) => {
    setToAmount(value);
    console.log();
  };

  useEffect(() => {
    const fromCurrencyLabel = cryptocurrencies.find(currency => currency.value === fromCurrency)?.label;
    setCurrencySymbol(fromCurrencyLabel);
  }, [fromCurrency]);

  const dependencies = { fromCurrency: fromCurrency, toCurrency: toCurrency };
  const { isLoading, isError, error } = useQuery({
    queryKey: ["exchangeRate", dependencies],
    queryFn: () => fetchData(fromCurrency, toCurrency).then(response => {
      console.log(response.data); // Log the response data
      setResponseData(response.data); // Update the state with response data
      return response; // Return the response
    }),
    staleTime: 1000 * 60,
    retry: 1,
    retryDelay: 60000
  });

  useEffect(() => {
    if (responseData && responseData.length > 0) {
      setToAmount(fromAmount * responseData[0].current_price);
    }
  }, [responseData, fromAmount]);

  return (
    <section className="exchange-rate">
      <Typography.Title style={{ color: "#4d4add" }} level={2}>Exchange Rate</Typography.Title>
      <Typography.Text>Get the latest exchange rate of cryptocurrencies in your favorite currency</Typography.Text>
      <section className="select-group" style={{ display: "flex", marginTop: "1rem", gap: "1rem", alignItems: "center" }}>
        <Select value={fromCurrency} options={cryptocurrencies} onChange={handleFromCurrencyChange} />
        <Input type="number" value={fromAmount} onChange={(e) => handleFromAmountChange(e.target.value)} style={{ width: '100px', margin: '0 0.5rem' }} />
        <Select value={toCurrency} options={fiatCurrencies} onChange={handleToCurrencyChange} />
        <Input type="number" value={toAmount} onChange={(e) => handleToAmountChange(e.target.value)} style={{ width: '100px', margin: '0 0.5rem' }} />
      </section>
      <section style={{ marginTop: '1rem' }}>
        {isLoading ? (
          <Spin tip="Fetching results" spinning size="large" />
        ) : isError ? (
          <div>Error: {error.message}</div>
        ) : responseData && responseData.length > 0 ? (
          <div>
            <ExchangeRateUI price={toAmount} dataObj={dependencies} currencySymbol={currencySymbol} />
          </div>
        ) : (
          <div>No data available</div>
        )}
      </section>
    </section>
  );
}

export default ExchangeRate;
