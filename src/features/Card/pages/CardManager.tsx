import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector, connect } from 'react-redux';
import { fetchCard, selectCardData, selectCardError, selectCardLoading } from '../cardSlice';
import AddCard from '../components/Add';
import EditCard from '../components/Edit';
import ListCard from '../components/ListCard';
const CardManager: React.FC<any> = () => {
	const dispatch = useDispatch();
	const [isAdd, setAdd] = useState(true);
	const [editingID, setEditingID] = useState(-1);
	// const [cards, setCards] = useState<ICardDetail[]>(CARD_LIST);
	const cards = useSelector(selectCardData);
	const loading = useSelector(selectCardLoading);
	const error = useSelector(selectCardError);
	useEffect(() => {
		dispatch(fetchCard());
		return () => {};
	}, [dispatch]);
	const toggleEdit = (id: number) => {
		if (isAdd) return;
		if (editingID !== -1) return;
		setEditingID(id);
	};
	if (loading === 'pending') return <div>Loading...</div>;
	if (loading === 'error') return <div>Error: {error}</div>;
	return (
		<div>
			<Container>
				<Row>
					<Col xs={{ size: isAdd || editingID >= 0 ? '8' : '12' }}>
						<Button onClick={() => setAdd(!isAdd)}>Thêm</Button>
						<ListCard cards={cards} setEdit={toggleEdit} />
					</Col>
					{(isAdd || editingID >= 0) && (
						<Col xs="4">
							{isAdd && <AddCard cancerAdd={() => isAdd && setAdd(false)} />}
							{editingID >= 0 && (
								<EditCard
									cancerEdit={() => editingID >= 0 && setEditingID(-1)}
									card={cards[editingID]}
								/>
							)}
						</Col>
					)}
				</Row>
			</Container>
		</div>
	);
};
export default connect()(CardManager);
