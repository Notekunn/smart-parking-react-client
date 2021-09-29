import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import AddCard from '../../components/Card/Add';
import EditCard from '../../components/Card/Edit';
import ListCard from '../../components/Card/ListCard';
const CARD_LIST: ICardDetail[] = [
	{
		id: 1,
		licence_plate: '37A1-123-253-223-53',
		owner: '',
		rfid: '231-123-123-213',
		status: 'OUT',
		type: 'DATE',
	},
	{
		id: 2,
		licence_plate: '37A1-123-253-223-53',
		owner: '',
		rfid: '231-123-123-215',
		status: 'PENDING',
		type: 'DATE',
	},
];
export default function CardManager() {
	const [isAdd, setAdd] = useState(true);
	const [isEdit, setEdit] = useState(false);
	const [cards, setCards] = useState<ICardDetail[]>(CARD_LIST);
	return (
		<div>
			<Container>
				<Row>
					<Col xs="8">
						<Button onClick={() => setAdd(!isAdd)}>Thêm</Button>
						<ListCard cards={cards} setEdit={setEdit} />
					</Col>
					<Col xs="4">
						{isAdd && <AddCard />}
						{isEdit && <EditCard />}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
