import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { fetchData } from "./hackAPI"

export interface HackState {
  activeCard: any
  status: "idle" | "loading" | "failed"
  data: any
  graphDataXAxis: any
  graphDataYAxis: any
}

const initialState: HackState = {
  activeCard: 3,
  status: "idle",
  data: null,
  graphDataXAxis: ['discount','price','stock','rating'],
  graphDataYAxis:  [
      {
        data: [1, 2, 1, 4],
      }
    ]
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchHackData = createAsyncThunk(
  "hack/fetchData",
  async () => {
    const response = await fetchData()
    // The value we return becomes the `fulfilled` action payload
    return response
  },
)

export const hackSlice = createSlice({
  name: "hack",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActiveCard: (state, action: PayloadAction<any>) => {
      state.activeCard = action.payload
    },
    toggleCards: (state, action: PayloadAction<any>) => {
      state.data.products = action.payload
    },
    applyBrandFilter: (state, action: PayloadAction<any>) => {
      state.data.products = action.payload
    },
    setYaxisData: (state, action: PayloadAction<any>) => {
      state.graphDataYAxis = action.payload
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchHackData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchHackData.fulfilled, (state, action) => {
        state.status = "idle"
        state.data = action.payload
        state.data.products = action.payload.products.slice(0,4)
        state.data.backupProducts = action.payload.products.slice(0,4)
      })
      .addCase(fetchHackData.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setActiveCard, toggleCards, applyBrandFilter, setYaxisData } = hackSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectActiveCard = (state: RootState) => state.hack.activeCard
export const selectHackData = (state: RootState) => state.hack.data?.products
export const selectBackupData = (state: RootState) => state.hack.data?.backupProducts
export const selectXAxisData = (state: RootState) => state.hack.graphDataXAxis
export const selectYAxisData = (state: RootState) => state.hack.graphDataYAxis

export default hackSlice.reducer
