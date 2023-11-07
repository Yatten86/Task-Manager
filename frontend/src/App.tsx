import React, { FC, ReactElement } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import customTheme from './theme/customTheme';
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClinet = new QueryClient();

const App: FC = (): ReactElement => {
  return (
    <QueryClientProvider client={queryClinet}>
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <Dashboard />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
};

export default App;
