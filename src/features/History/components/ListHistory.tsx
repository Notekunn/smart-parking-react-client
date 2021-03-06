import React, { memo } from 'react'
import { Table } from 'reactstrap'
import { dateFormat } from '../../../services/date'
export interface ListHistoryProps {
	history: IHistoryDetail[]
}
const ListHistory: React.FC<ListHistoryProps> = memo((props: ListHistoryProps) => {
	const { history } = props
	console.log('Rerender')
	return (
		<div>
			<Table bordered>
				<thead>
					<tr>
						<td>#</td>
						<td>Mã Thẻ</td>
						<td>Vị trí đỗ</td>
						<td>Thời gian vào</td>
						<td>Thời gian ra</td>
					</tr>
				</thead>
				<tbody>
					{history.map((e) => (
						<tr key={e.id}>
							<td>{e.id}</td>
							<td>
								{e.card.licencePlate || e.card.rfid}
								(#{e.card.id})
							</td>
							<td>{e.parking.name}</td>
							<td>{dateFormat(e.timeIn)}</td>
							<td>{e.timeOut && dateFormat(e.timeOut)}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
})

export default ListHistory
