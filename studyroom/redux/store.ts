// store.ts
import { configureStore } from '@reduxjs/toolkit';
import bookingReducer from './bookingSlice';
import userReducer from './userSlice';
import appReducer from './appSlice';
// Import composeWithDevTools for development environment
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin';

const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
    app: appReducer,
  },
  devTools: false,
  enhancers: getDefaultEnhancers => getDefaultEnhancers().concat(devToolsEnhancer()),

});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;