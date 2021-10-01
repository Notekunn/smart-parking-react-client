import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
interface HistoryState {
	history: []
}
export const fetchHistory = createAsyncThunk('history/fetch', () => {})
const historySlice = createSlice({
	name: 'history',
	initialState: {},
	reducers: {},
})

export default historySlice.reducer
