import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as cardService from '../../services/card';
import type { RootState } from '../../app/store';
interface CardState {
	loading: 'idle' | 'pending' | 'success' | 'error';
	error?: string;
	data: ICardDetail[];
}
export const fetchCard = createAsyncThunk('card/fetch', async (_, thunk) => {
	const { data: cards } = await cardService.fetchCard();
	return cards;
});
const cardSlice = createSlice({
	name: 'card',
	initialState: {
		loading: 'idle',
		data: [],
	} as CardState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCard.pending, (state) => {
				state.loading = 'pending';
			})
			.addCase(fetchCard.fulfilled, (state, action) => {
				state.loading = 'success';
				state.data = action.payload;
			})
			.addCase(fetchCard.rejected, (state, action) => {
				state.loading = 'error';
				state.error = action.error.message;
			});
	},
});

// Export actions
export const {} = cardSlice.actions;

// Export selector
export const selectCardData = (state: RootState) => state.card.data;
export const selectCardLoading = (state: RootState) => state.card.loading;
export const selectCardError = (state: RootState) => state.card.error;

export default cardSlice.reducer;
