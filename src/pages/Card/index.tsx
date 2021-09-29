import React, { useEffect, useState } from 'react';
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
	const [editingID, setEditingID] = useState(-1);
	const [cards, setCards] = useState<ICardDetail[]>(CARD_LIST);
	const toggleEdit = (id: number) => {
		if (isAdd) return;
		if (editingID !== -1) return;
		setEditingID(id);
	};

	return (
		<div>
			<Container>
				<Row>
					<Col xs="auto">
						<Button onClick={() => setAdd(!isAdd)}>Thêm</Button>
						<ListCard cards={cards} setEdit={toggleEdit} />
					</Col>
					<Col xs="4">
						{isAdd && <AddCard cancerAdd={() => isAdd && setAdd(false)} />}
						{editingID >= 0 && (
							<EditCard
								cancerEdit={() => editingID >= 0 && setEditingID(-1)}
								card={cards[editingID]}
							/>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
}
