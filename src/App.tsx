import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import RoutesConfig from './routes';
import { queryClient } from './config/react-query';

function App() {

  return <div className='app'>
    <QueryClientProvider client={queryClient}>
    <RoutesConfig />

    </QueryClientProvider>
  </div>
}

export default App
