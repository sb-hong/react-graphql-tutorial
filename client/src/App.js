import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayData from './fragments/DisplayData';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'https://ba37b5nn6k.execute-api.ap-southeast-1.amazonaws.com/prod/graphql'
    // uri: 'http://localhost:4000/graphql'
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <DisplayData></DisplayData>
      </div>
    </ApolloProvider>
  );
}

export default App;
