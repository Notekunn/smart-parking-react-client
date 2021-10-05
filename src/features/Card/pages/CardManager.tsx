import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Col, Container, Row } from 'reactstrap'
import { connect, ConnectedProps } from 'react-redux'
import { fetchCard, selectCardData, selectCardError, selectCardLoading } from '../cardSlice'
import AddCard from '../components/Add'
import EditCard from '../components/Edit'
import ListCard from '../components/ListCard'
import type { RootState, AppDispatch } from '../../../app/store'
// import type { Dispatch } from 'react-redux';
const mapStateToProps = (state: RootState) => {
	return {
		cards: selectCardData(state),
		loading: selectCardLoading(state),
		error: selectCardError(state),
	}
}
const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		fetchAll: () => dispatch(fetchCard()),
	}
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type CardManagerProps = ConnectedProps<typeof connector>
const CardManager: React.FC<CardManagerProps> = (props) => {
	const { cards, loading, error, fetchAll } = props
	const [isAdd, setAdd] = useState(false)
	const [editingID, setEditingID] = useState(-1)
	useEffect(() => {
		fetchAll()
		return () => {}
	}, [fetchAll])

	const toggleEdit = (id: number) => {
		if (isAdd) return
		if (editingID !== -1) return
		setEditingID(id)
	}
	if (loading === 'pending') return <div>Loading...</div>
	if (loading === 'error') return <div>Error: {error}</div>
	return (
		<div>
			<Container>
				<Row>
					<Col xs="12">
						<ButtonGroup>
							<Button onClick={() => setAdd(!isAdd)}>Thêm</Button>
							<Button color="success" onClick={() => fetchAll()}>
								Cập nhật
							</Button>
						</ButtonGroup>
					</Col>
					<Col xs={{ size: isAdd || editingID >= 0 ? '8' : '12' }}>
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
	)
}
export default connector(CardManager)
