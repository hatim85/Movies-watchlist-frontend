import { createStore,combineReducers } from 'redux';
import moviesReducer from './redux/moviesSlice.js';
import authReducer from './redux/authSlice.js';
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  user:authReducer,
  movies: moviesReducer,
});

const persistConfig={
  key:'root',
  storage,
  version:1
}

const persistedReducer=persistReducer(persistConfig,rootReducer);
const store=createStore(persistedReducer);

export const persistor=persistStore(store);
export default store;