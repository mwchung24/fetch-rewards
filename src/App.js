import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import LoginPage from './containers/LoginPage/LoginPage';
import './App.css';
import SearchPage from './containers/SearchPage/SearchPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
