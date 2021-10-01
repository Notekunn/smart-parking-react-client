// import { AxiosResponse } from 'axios';
import { fetchAllAdapter, fetchOneAdapter } from './apiAdapter'
import axiosClient from './axiosClient'

export const fetchCard = async (): Promise<ICardDetail[]> => {
	const response = await axiosClient.get('/cards')
	return fetchAllAdapter<ICardDetail>(response)
}

export const deleteCard = async (id: number): Promise<Nullable<ICardDetail>> => {
	const response = await axiosClient.delete('/cards/' + id)
	return fetchOneAdapter<ICardDetail>(response)
}

export const updateCard = async (
	id: number,
	data: Partial<ICardDetail>
): Promise<Nullable<ICardDetail>> => {
	const response = await axiosClient.patch('/cards/' + id, data)
	return fetchOneAdapter<ICardDetail>(response)
}
