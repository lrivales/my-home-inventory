import logo from './logo.svg';
import './App.css';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';

import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Home from './pages/Home';

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
        <Home />
    </div>
    </ApolloProvider>
  );
}

export default App;
