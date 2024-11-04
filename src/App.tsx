import { QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import RoutesConfig from './routes';
import { queryClient } from './config/react-query';
import { TopHeader } from './components/layout/top-header';
import { createPortal } from 'react-dom';

function App() {

  return <div className='app'>
    <QueryClientProvider client={queryClient}>
      {
        createPortal(<TopHeader />, document.body)
      }
      <RoutesConfig />
    </QueryClientProvider>
  </div>
}

export default App
