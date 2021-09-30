import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { useDispatch, useSelector, connect, ConnectedProps } from 'react-redux';
import { fetchCard, selectCardData, selectCardError, selectCardLoading } from '../cardSlice';
import AddCard from '../components/Add';
import EditCard from '../components/Edit';
import ListCard from '../components/ListCard';
import type { RootState } from '../../../app/store';
// import type { Dispatch } from 'react-redux';
const mapStateToProps = (state: RootState) => {
	return {
		cards: selectCardData(state),
		loading: selectCardLoading(state),
		error: selectCardError(state),
	};
};
const connector = connect(mapStateToProps);
type CardManagerProps = ConnectedProps<typeof connector>;
const CardManager: React.FC<CardManagerProps> = (props) => {
	const dispatch = useDispatch();
	const { cards, loading, error } = props;
	const [isAdd, setAdd] = useState(false);
	const [editingID, setEditingID] = useState(-1);
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
			<Container fluid>
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
export default connector(CardManager);
