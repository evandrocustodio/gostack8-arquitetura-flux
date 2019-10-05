import React from 'react';
import './config/ReactotronConfig';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './route';
import GlobalStyle from './styles/global';
import Header from './components/Header';
import store from './store/index';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
