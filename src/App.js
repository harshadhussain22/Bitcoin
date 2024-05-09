import React from 'react';
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from './Components/Navbar';
import ExchangeRate from './Components/ExchangeRate';

// const { data: conversionRate, isLoading, isError, error } = useQuery({
//   queryKey: ["exchangeRate", dependencies],
//   queryFn: () => fetchData(fromCurrency, toCurrency),
//   staleTime: 1000 * 60,
//   retry: 1,
//   retryDelay: 60000
// });

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar/>
      <ExchangeRate/>
      </QueryClientProvider>
  );
}

export default App;
