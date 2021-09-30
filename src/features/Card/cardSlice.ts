import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as cardService from '../../services/card';
import type { RootState } from '../../app/store';
import _ from 'lodash';
interface CardState {
	loading: 'idle' | 'pending' | 'success' | 'error';
	editLoading: 'idle' | 'pending' | 'success' | 'error';
	error?: string;
	data: ICardDetail[];
}
export const fetchCard = createAsyncThunk('card/fetch', async (_, thunk) => {
	const cards = await cardService.fetchCard();
	return cards;
});
export const deleteCard = createAsyncThunk('card/delete', async (cardId: number) => {
	await cardService.deleteCard(cardId);
	return cardId;
});
export const updateCard = createAsyncThunk(
	'card/update',
	async (data: UpdateOption<ICardDetail>) => {
		const card = await cardService.updateCard(data.id, data);
		return card;
	}
);
const cardSlice = createSlice({
	name: 'card',
	initialState: {
		loading: 'idle',
		editLoading: 'idle',
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
		builder.addCase(deleteCard.fulfilled, (state, action) => {
			state.data = state.data.filter((card) => card.id !== action.payload);
		});
		builder
			.addCase(updateCard.pending, (state) => {
				state.editLoading = 'pending';
			})
			.addCase(updateCard.fulfilled, (state, action) => {
				state.editLoading = 'success';
				state.data = state.data.map((e) => {
					if (e.id === action.payload?.id) return action.payload;
					return e;
				});
			})
			.addCase(updateCard.rejected, (state, action) => {
				state.editLoading = 'error';
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
export const selectCardEditLoading = (state: RootState) => state.card.editLoading;

export default cardSlice.reducer;
