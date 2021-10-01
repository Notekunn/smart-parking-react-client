import React from 'react'
import { Badge } from 'reactstrap'
export interface CardTypeProps {
	type: ICardType
}
const badgeTypes = {
	DATE: 'primary',
	MONTH: 'success',
	MASTER: 'danger',
}
function CardType(props: CardTypeProps) {
	const { type } = props
	return <Badge color={badgeTypes[type]}>{type}</Badge>
}

export default CardType
