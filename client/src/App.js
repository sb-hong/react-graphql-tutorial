import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import DisplayData from './fragments/DisplayData';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://react-graphql-tutorial-env.eba-hmyrmqwq.ap-southeast-1.elasticbeanstalk.com/graphql'
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
