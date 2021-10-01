import React from 'react'
import { Badge } from 'reactstrap'
export interface CardStatusProps {
	status: ICardStatus
}
// const cardStatusName: { [key in ICardStatus]: string } = {
// 	PENDING: 'Chờ duyệt',
// 	OUT: 'Đã rời đi',
// 	PAYING: 'Đang thanh toán',
// 	DRIVING_IN: 'Đang di chuyển vào bãi đỗ xe',
// 	DRIVING_OUT: 'Đang di chuyển ra khỏi bãi đỗ xe',
// 	PARKING: 'Đang đậu xe',
// }
export default function CardStatus(props: CardStatusProps) {
	return <Badge color="secondary">{props.status}</Badge>
}
