import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/usersSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumApi } from "./apis/albumApi";
import { photosApi } from "./apis/photosApi";
export const store=configureStore({
    reducer:{
        users:userReducer,
        [albumApi.reducerPath]:albumApi.reducer,
        [photosApi.reducerPath]:photosApi.reducer
    },
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware().concat(albumApi.middleware)
        .concat(photosApi.middleware);
    }
});

window.store=store;

setupListeners(store.dispatch);

export * from "./thunks/fetchUsers";
export * from "./thunks/addUser";
export * from "./thunks//removeUser";
export {useFetchAlbumsQuery,useAddAlbumMutation,useRemoveAlbumMutation} from "./apis/albumApi";
export {useFetchPhotosQuery,useAddPhotoMutation,useRemovePhotoMutation} from "./apis/photosApi";