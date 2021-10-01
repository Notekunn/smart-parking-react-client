import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import * as historyService from '../../services/history'
interface HistoryState {
	loading: 'idle' | 'pending' | 'success' | 'error'
	history: IHistoryDetail[]
	error?: string
}
export const fetchHistory = createAsyncThunk('history/fetch', async () => {
	const history = await historyService.fetchAll()
	return history.sort((a, b) => {
		return new Date(b.timeIn).getTime() - new Date(a.timeIn).getTime()
	})
})
const historySlice = createSlice({
	name: 'history',
	initialState: {
		loading: 'idle',
		history: [],
	} as HistoryState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHistory.pending, (state) => {
				state.loading = 'pending'
			})
			.addCase(fetchHistory.fulfilled, (state, action) => {
				state.loading = 'success'
				state.history = action.payload
			})
			.addCase(fetchHistory.rejected, (state, action) => {
				state.loading = 'error'
				state.error = action.error.message
			})
	},
})

export const selectHistoryData = (state: RootState) => state.history.history
export const selectHistoryLoading = (state: RootState) => state.history.loading
export const selectHistoryError = (state: RootState) => state.history.error

export default historySlice.reducer
