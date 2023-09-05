import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Provider } from 'react-redux'; // Importe o Provider do Redux
import { store, persistor } from './store/configureStore'; // Importe sua store do Redux
import { PersistGate } from 'redux-persist/integration/react';
import App from './app'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App store={store} />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
