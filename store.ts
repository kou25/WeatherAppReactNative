import { configureStore } from "@reduxjs/toolkit";
import originReducer from "./slices/originSlice";

export const store = configureStore({
  reducer: {
    country: originReducer
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
