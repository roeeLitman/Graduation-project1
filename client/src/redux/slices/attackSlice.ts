import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { attackTypeState, dataStatus } from "../../types/redux.typs";

const initialData: attackTypeState = {
    error: null,
    status: dataStatus.IDLE,
    attack: null,
    role: undefined,
};

export const getAttack = createAsyncThunk(
    "attack/getAttack",
    async (_, thunkAPI) => {
        try {
            const response = await fetch(
                `http://localhost:3000/api/typesAttack/get-rating`
            );

            if (!response.ok) {
                return thunkAPI.rejectWithValue(
                    "Couldn't get please try again "
                );
            }

            const result = await response.json();
            console.log(result);
            
            return result.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue("Sorry something went wrong");
        }
    }
);

const attackTypeSlace = createSlice({
    name: "attackType",
    initialState: initialData,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<attackTypeState>) => {
        builder
            .addCase(getAttack.pending, (state) => {
              state.error = null;
              state.attack = null;
              state.status = dataStatus.LOADING;
            })
            .addCase(getAttack.rejected, (state, action) => {
                state.error = action.error as string;
                state.attack = null;
                state.role = undefined;
                state.status = dataStatus.FAILED;
            })
            .addCase(getAttack.fulfilled, (state, action) => {
                state.attack = action.payload;
                state.error = null;
                state.status = dataStatus.SUCCESS;
            });
    },
});

// export const {} = attackTypeSlace.actions;
export default attackTypeSlace;
