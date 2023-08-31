import loginReducer from '../reducers/loginReducer.js';
import { createStore, combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const todosOsReducers = combineReducers({ 
   loginReducer // Aqui é onde você nomeia o reducer
});

const persistConfig = {
   key: 'root',
   storage,
 };

 const persistedReducer = persistReducer(persistConfig, todosOsReducers);
 const store = createStore(persistedReducer);
 const persistor = persistStore(store);

export { store, persistor };
