// import {
//     Action,
//     ActionReducerMapBuilder,
//     createAsyncThunk,
//     createSlice,
//     PayloadAction,
// } from "@reduxjs/toolkit";
// import { dataStatus } from "../../types/redux.typs";

// import { IProduct } from "../../types/product";
// import { productState } from "../../types/productState";
// import { useSelector } from "react-redux";
// // import { socket } from "../../App";

// const port = import.meta.env.VITE_PORT;

// const initialData: productState = {
//     error: null,
//     status: dataStatus.IDLE,
//     data: [],
// };

// const fetchAllProducts = createAsyncThunk(
//     "products/fetchAll",
//     async (_, thunkAPI) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:${port}/api/products`
//             );
//             const data = await response.json();
//             return data.data;
//         } catch (error) {
//             console.log(error);

//             return thunkAPI.rejectWithValue("something went wrong");
//         }
//     }
// );

// const fetchByCategory = createAsyncThunk(
//     "products/fetchByCategory",
//     async (category: string, thunkAPI) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:${port}/api/products/${category}`
//             );
//             if (!response.ok) {
//                 return thunkAPI.rejectWithValue(
//                     "Couldn't get products Please try again"
//                 );
//             }
//             const data = await response.json();
//             return data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue("something went wrong");
//         }
//     }
// );

// const fetchByName = createAsyncThunk(
//     "products/fetchByName",
//     async (name: string, thunkAPI) => {
//         try {
//             const response = await fetch(
//                 `http://localhost:${port}/api/products/search/${name}`
//             );
//             // if (!response.ok) {
//             //   return thunkAPI.rejectWithValue(
//             //     "Couldn't get products Please try again"
//             //   );
//             // }
//             const data = await response.json();

//             return data.data;
//         } catch (error) {
//             return thunkAPI.rejectWithValue("something went wrong");
//         }
//     }
// );

// const productSlice = createSlice({
//     name: "products",
//     initialState: initialData,
//     reducers: {
//         setProduct(state, action: PayloadAction<IProduct>) {
//             state.data = state.data.map((item) => {
//                 if (!item) {
//                     console.warn("Found null/undefined product:", item);
//                     return item;
//                 }
//                 if (item._id === (action.payload._id as string)) {
//                     return {
//                         ...item,
//                         quantity: action.payload.quantity,
//                     };
//                 }
//                 return item;
//             });
//         },
//     },

//     extraReducers: (builder: ActionReducerMapBuilder<productState>) => {
//         builder
//             .addCase(fetchAllProducts.pending, (state) => {
//                 state.status = dataStatus.LOADING;
//                 state.error = null;
//             })
//             .addCase(fetchAllProducts.fulfilled, (state, action) => {
//                 state.data = action.payload as unknown as IProduct[];

//                 state.error = null;
//                 state.status = dataStatus.SUCCESS;
//             })
//             .addCase(fetchAllProducts.rejected, (state, action) => {
//                 state.error = action.error as string;

//                 state.data = [];
//                 state.status = dataStatus.FAILED;
//             })
//             .addCase(fetchByCategory.fulfilled, (state, action) => {
//                 state.error = null;
//                 state.status = dataStatus.SUCCESS;
//                 state.data = action.payload as IProduct[];
//             })
//             .addCase(fetchByCategory.rejected, (state, action) => {
//                 state.error = action.error as string;
//                 state.status = dataStatus.FAILED;
//             })
//             .addCase(fetchByCategory.pending, (state) => {
//                 state.error = null;
//                 state.status = dataStatus.LOADING;
//             })
//             .addCase(fetchByName.pending, (state) => {
//                 state.status = dataStatus.LOADING;
//                 state.error = null;
//             })
//             .addCase(fetchByName.fulfilled, (state, action) => {
//                 state.data = action.payload as IProduct[];
//                 state.status = dataStatus.SUCCESS;
//             })
//             .addCase(fetchByName.rejected, (state, action) => {
//                 state.error = action.error as string;
//                 state.status = dataStatus.FAILED;
//             });
//     },
// });
// export const {} = productSlice.actions;
// export { fetchAllProducts, fetchByCategory, fetchByName };
// export default productSlice;
