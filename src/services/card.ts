import { AxiosResponse } from 'axios';
import axiosClient from './axiosClient';

export const fetchCard = (): Promise<AxiosResponse<ICardDetail[]>> => axiosClient.get('/cards');

export const deleteCard = (id: number): Promise<void> => axiosClient.delete('/cards/' + id);
