import axios from 'axios';

export function fetchData(fromCurrency, toCurrency) {
  const apiKey = 'bfdaa521-5241-435d-8d9b-280758238d58'; // Your API key
  const apiUrl = `api.coincap.io/v2/exchanges${apiKey}/pair/${fromCurrency}/${toCurrency}`;

  return axios.get(apiUrl)
    .then(response => {
      const conversionRate = response.data.conversion_rate;
      return conversionRate; // Return the conversion rate
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
}