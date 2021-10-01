/// <reference types="react-scripts" />

type ICardStatus = 'PENDING' | 'DRIVING_IN' | 'DRIVING_OUT' | 'PARKING' | 'PAYING' | 'OUT'

type ICardType = 'MONTH' | 'DATE' | 'MASTER'
interface ICardDetail {
	id: number
	rfid: string
	licencePlate: string
	owner: string
	status: ICardStatus
	type: ICardType
}

interface IParkingDetail {
	id: number
	status: 'FREE' | 'INSERVING' | 'SERVING'
	name: string
}
interface IHistoryDetail {
	id: number
	card: ICardDetail
	parking: IParkingDetail
	timeIn: string
	timeOut: string
}
type InputType =
	| 'text'
	| 'email'
	| 'select'
	| 'file'
	| 'radio'
	| 'checkbox'
	| 'textarea'
	| 'button'
	| 'reset'
	| 'submit'
	| 'date'
	| 'datetime-local'
	| 'hidden'
	| 'image'
	| 'month'
	| 'number'
	| 'range'
	| 'search'
	| 'tel'
	| 'url'
	| 'week'
	| 'password'
	| 'datetime'
	| 'time'
	| 'color'

type Nullable<T> = T | null

type WithOptional<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>

type UpdateOption<T> = WithOptional<T, 'id'>
