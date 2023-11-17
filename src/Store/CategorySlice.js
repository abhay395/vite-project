import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Categorys: [
    [
      {
        id: 1,
        text: "",
      },
    ],
  ],
  notifyCall:false,
  CartId: [],
  Addedid: [],
  SearchItem: "",
  filterData: [],
  status: false,
  userData: null,

  // CartNomOfProduct:0
};
export const CategorySlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addCatgory: (state, action) => {
      if (state.Categorys.length < 2) state.Categorys.push(action.payload);
    },
    addCart: (state, action) => {
      state.CartId.push(action.payload);
    },
    removeCart: (state, action) => {
      state.CartId = state.CartId.filter(
        (item) => item[0].id !== action.payload
      );
      if (state.Addedid.includes(action.payload)) {
        state.Addedid = state.Addedid.splice(
          state.Addedid.indexOf(action.payload)
        );
      }
    },
    removeAllCart:(state)=>{
      state.CartId=[]
      state.Addedid=[]
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload[0];
      const item = state.CartId.find((item) => item[0].id === productId);
      if (item) {
        item[1].quantityid += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload[0];
      const item = state.CartId.find((item) => item[0].id === productId);
      if (item && item[1].quantityid > 0) {
        item[1].quantityid -= 1;
      }
    },
    addedid: (state, action) => {
      state.Addedid.push(action.payload);
    },
    SetSearchitem: (state, action) => {
      state.SearchItem = action.payload;
    },
    addFilterData: (state, action) => {
      state.filterData = action.payload;
    },
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
    notifyCallSet:(state)=>{
      state.notifyCall=true
    }
  },
});

export const {
  addCatgory,
  addCart,
  removeCart,
  incrementQuantity,
  decrementQuantity,
  addedid,
  SetSearchitem,
  addFilterData,
  login, logout,notifyCallSet
  ,removeAllCart
} = CategorySlice.actions;
export default CategorySlice.reducer;
