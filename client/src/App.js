import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';

import {
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Items from './pages/Items';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/home-inventory' element={<Home />} />
          <Route exact path='/home-inventory/login' element={<Login />} />
          <Route exact path='/home-inventory/items' element={<Items />} />
        </Routes>
      </div>
    </ApolloProvider>
  );
}

export default App;
