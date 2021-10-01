import { AxiosResponse } from 'axios'

/**
 * Adapter cho api để lấy data sau khi gọi api
 */
export type FetchAllResponse<T> = AxiosResponse<{
	data: T[]
	error?: {
		message: string
	}
}>
export type FetchOneResponse<T> = AxiosResponse<{
	data: T
	error?: {
		message: string
	}
}>
export interface FetchError {
	message: string
}
export function fetchAllAdapter<T>(response: FetchAllResponse<T>): T[] {
	if (response.status > 304 && response.data.error) {
		return []
	}
	return response.data.data
}
export function fetchOneAdapter<T>(response: FetchOneResponse<T>): Nullable<T> {
	if (response.status > 304 && response.data.error) {
		return null
	}
	return response.data.data
}
