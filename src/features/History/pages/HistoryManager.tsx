import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import { AppDispatch, RootState } from '../../../app/store'
import ListHistory from '../components/ListHistory'
import {
	fetchHistory,
	selectHistoryData,
	selectHistoryError,
	selectHistoryLoading,
} from '../historySlice'
const mapStateToProps = (state: RootState) => {
	return {
		history: selectHistoryData(state),
		loading: selectHistoryLoading(state),
		error: selectHistoryError(state),
	}
}
const mapDispatchToProps = (dispatch: AppDispatch) => {
	return {
		fetchAll: () => dispatch(fetchHistory()),
	}
}
const connector = connect(mapStateToProps, mapDispatchToProps)
type HistoryManagerProps = ConnectedProps<typeof connector>

const HistoryManager: React.FC<HistoryManagerProps> = (props) => {
	const { error, loading, history, fetchAll } = props
	useEffect(() => {
		fetchAll()
		const interval = setInterval(fetchAll, 500)
		return () => {
			clearInterval(interval)
		}
	}, [fetchAll])
	// if (loading === 'pending') return <div>Loading...</div>
	if (loading === 'error') return <div>Error: {error}</div>
	// if (loading === 'success')
	return (
		<div>
			<Container>
				<Row>
					<Col xs="12">
						<ListHistory history={history} />
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default connector(HistoryManager)
