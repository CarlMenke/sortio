import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Navigation from './components/Navigation';

function App(): JSX.Element {
  return (
    <Provider store = {store}>
      <Navigation/>
    </Provider>
  );
}

export default App;
