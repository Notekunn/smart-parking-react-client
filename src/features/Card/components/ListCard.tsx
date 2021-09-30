import React from 'react';

import { Button, ButtonGroup, Table } from 'reactstrap';
import CardStatus from './CardStatus';
import CardType from './CardType';
import { useDispatch } from 'react-redux';
import { deleteCard } from '../cardSlice';
export interface ListCardProps {
	cards: ICardDetail[];
	setEdit: (id: number) => void;
}
export default function ListCard(props: ListCardProps) {
	const dispatch = useDispatch();
	const { cards, setEdit } = props;
	if (cards.length === 0) return <div>Chưa có thẻ nào</div>;
	return (
		<Table bordered>
			<thead>
				<tr>
					<th>#</th>
					<th>Mã thẻ</th>
					<th>Biển kiểm soát</th>
					<th>Chủ phương tiện</th>
					<th>Loại thẻ</th>
					<th>Trạng thái</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{cards.map((e, i) => (
					<tr key={i}>
						<th scope="row">{e.id}</th>
						<td>{e.rfid}</td>
						<td>{e.licencePlate}</td>
						<td>{e.owner}</td>
						<td>
							<CardType type={e.type} />
						</td>
						<td>
							<CardStatus status={e.status} />
						</td>
						<td>
							<ButtonGroup>
								<Button outline color="secondary" onClick={() => setEdit(i)}>
									Sửa
								</Button>
								<Button outline color="danger" onClick={() => dispatch(deleteCard(e.id))}>
									Xóa
								</Button>
							</ButtonGroup>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
