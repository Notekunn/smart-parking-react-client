import { fetchAllAdapter } from './apiAdapter'
import axiosClient from './axiosClient'

export const fetchAll = async (): Promise<IHistoryDetail[]> => {
	const response = await axiosClient.get('/history')
	response.data.timeIn = new Date(response.data.timeIn)
	response.data.timeOut = new Date(response.data.timeOut)
	return fetchAllAdapter<IHistoryDetail>(response)
}
