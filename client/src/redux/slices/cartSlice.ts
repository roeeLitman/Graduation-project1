// import {
//     Action,
//     ActionReducerMapBuilder,
//     createAsyncThunk,
//     createSlice,
//     PayloadAction,
// } from "@reduxjs/toolkit";
// import { dataStatus } from "../../types/redux.typs";
// import { IUser } from "../../types/user";
// import userState from "../../types/userState";
// import { cartState } from "../../types/cartState";
// import { ICart } from "../../types/cart";

// const port = import.meta.env.VITE_PORT;
// const initialData: cartState = {
//     error: null,
//     status: dataStatus.IDLE,
//     data: null,
// };

// const fetchCart = createAsyncThunk(
//     "cart/fetch",
//     async (id: string, thunkAPI) => {
//         try {
//             const token = localStorage.getItem("token");
//             console.log("ftyg");

//             const response = await fetch(
//                 `http://localhost:${port}/api/cart/userCart/${id}`,
//                 {
//                     headers: {
//                         Authorization: token ? token : "",
//                     },
//                 }
//             );
//             console.log(response);

//             const data = await response.json();
//             console.log(data);

//             return data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue("something went wrong");
//         }
//     }
// );

// const checkout = createAsyncThunk(
//     "cart/checkout",
//     async (payment: { userId: string; creditCard: string }, thunkAPI) => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(
//                 `http://localhost:${port}/api/cart/payment`,
//                 {
//                     method: "PUT",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: token ? token : "",
//                     },
//                     body: JSON.stringify(payment),
//                 }
//             );
//             // if (!response.ok) {
//             //   return thunkAPI.rejectWithValue("Couldn't checkout Please try again");
//             // }
//             const data = await response.json();
//             return data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue("something went wrong");
//         }
//     }
// );

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: initialData,
//     reducers: {
//         addToCart: (state, action) => {
//             state.data?.receipt.push(action.payload);
//         },
//         setCart: (state, action: PayloadAction<ICart>) => {
//             state.data = action.payload;
//         },
//         logout: (state) => {
//             state.data = null;
//         },
//     },
//     extraReducers: (builder: ActionReducerMapBuilder<cartState>) => {
//         builder.addCase(checkout.pending, (state) => {
//             state.status = dataStatus.LOADING;
//             state.error = null;
//         });
//         builder.addCase(checkout.fulfilled, (state, action) => {
//             state.data = action.payload as unknown as ICart;
//             state.error = null;
//             state.status = dataStatus.SUCCESS;
//         });
//         builder.addCase(checkout.rejected, (state, action) => {
//             state.error = action.error as string;
//             state.data = null;
//             state.status = dataStatus.FAILED;
//         });
//         builder.addCase(fetchCart.pending, (state) => {
//             state.status = dataStatus.LOADING;
//             state.error = null;
//         });
//         builder.addCase(fetchCart.fulfilled, (state, action) => {
//             state.data = action.payload as unknown as ICart;
//             state.error = null;
//             state.status = dataStatus.SUCCESS;
//         });
//         builder.addCase(fetchCart.rejected, (state, action) => {
//             state.error = action.error as string;
//             state.data = null;
//             state.status = dataStatus.FAILED;
//         });
//     },
// });

// export const {} = cartSlice.actions;
// export { fetchCart, checkout };
// export default cartSlice;
