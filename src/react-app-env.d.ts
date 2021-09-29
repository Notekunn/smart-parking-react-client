/// <reference types="react-scripts" />

type ICardStatus = 'PENDING' | 'DRIVING_IN' | 'DRIVING_OUT' | 'PARKING' | 'PAYING' | 'OUT';

type ICardType = 'MONTH' | 'DATE' | 'MASTER';
interface ICardDetail {
	id: number;
	rfid: string;
	licence_plate: string;
	owner: string;
	status: ICardStatus;
	type: ICardType;
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
	| 'color';
