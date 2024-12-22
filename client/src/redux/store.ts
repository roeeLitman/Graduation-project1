import { configureStore } from "@reduxjs/toolkit";
import attackTypeSlace from "./slices/attackSlice";
import { useDispatch, useSelector } from "react-redux";


const store = configureStore({
    reducer: {
        attackTypes: attackTypeSlace.reducer,

    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export default store