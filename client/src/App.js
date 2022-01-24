import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

import {
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Home from './pages/Home';
import Login from './pages/Login';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={{client}}>
      <div className="App">
        {/* <Hero /> */}
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
