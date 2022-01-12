import { configureStore } from '@reduxjs/toolkit';
import { expoLogger } from "expo-redux-logger";
import { AsyncStorage } from 'react-native';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers/rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['intervalTimer', 'creatingWorkout', 'creatingWorkoutPlan']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancerList = [];

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(expoLogger),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),

  // devTools is by default true including with trace so I'm assuming this section is gtg for react debugger with redux
  devTools: process.env.NODE_ENV !== 'production'
})
export const persistor = persistStore(store);


