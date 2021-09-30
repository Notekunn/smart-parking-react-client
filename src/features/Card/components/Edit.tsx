import { Formik, Form, FastField } from 'formik';
import React, { useState } from 'react';
import { Row, Button, Alert, ButtonGroup } from 'reactstrap';
import InputField from '../../../custom-fields/InputField';
import SelectField from '../../../custom-fields/SelectField';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectCardEditLoading, selectCardError, updateCard } from '../cardSlice';
export interface EditCardProps {
	cancerEdit: () => any;
	card: ICardDetail;
}
const CARD_OPTIONS = [
	{ value: 'DATE', label: 'Thẻ ngày' },
	{ value: 'MONTH', label: 'Thẻ tháng' },
	{ value: 'MASTER', label: 'Thẻ admin' },
];
const validationSchema = yup.object({
	rfid: yup.string().required('Thẻ RFID không hợp lệ'),
	licence_plate: yup.string().default('').nullable(),
	owner: yup.string().default('').nullable(),
	type: yup
		.string()
		.oneOf(['DATE', 'MONTH', 'YEAR'], 'Loại thẻ không đúng')
		.required('Vui lòng chọn loại thẻ'),
});
const EditCard: React.FC<EditCardProps> = (props: EditCardProps) => {
	const dispatch = useDispatch();
	const error = useSelector(selectCardError);
	const editLoading = useSelector(selectCardEditLoading);
	const { card, cancerEdit } = props;
	const { id, licencePlate, rfid, owner, status, type } = card;
	const handleActiveCard = () => {
		if (status !== 'PENDING') return;
		dispatch(updateCard({ id, status: 'OUT' }));
	};
	if (editLoading === 'pending') return <div>Editing..</div>;
	return (
		<Formik
			initialValues={{
				rfid,
				licencePlate,
				owner,
				type,
			}}
			onSubmit={(values, actions) => {
				dispatch(
					updateCard({
						...values,
						id,
					})
				);
				actions.resetForm();
				cancerEdit();
			}}
			validationSchema={validationSchema}
		>
			{(formikProp) => {
				// const { errors, values, touched } = formikProp;
				return (
					<Form>
						<Row>
							<h4 className="m-auto"> Sửa thẻ </h4>
						</Row>
						{editLoading === 'error' && <Alert color="danger">{error}</Alert>}
						{status === 'PENDING' && <Alert color="primary">Thẻ chưa kích hoạt</Alert>}
						<FastField
							name="rfid"
							component={InputField}
							label="RFID"
							placeholder="249-85-64-178"
							disabled={true}
						/>
						<FastField name="licencePlate" component={InputField} label="Biển kiểm soát" />
						<FastField name="owner" component={InputField} label="Chủ phương tiện" />
						<FastField
							name="type"
							component={SelectField}
							label="Loại thẻ"
							placeholder="Chọn loại thẻ"
							options={CARD_OPTIONS}
						/>
						<div className="text-center">
							<ButtonGroup>
								<Button type="submit" color="primary">
									Lưu
								</Button>
								{status === 'PENDING' && (
									<Button type="button" color="success" onClick={handleActiveCard}>
										Kích hoạt
									</Button>
								)}
								<Button type="button" onClick={cancerEdit} color="danger">
									Hủy
								</Button>
							</ButtonGroup>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};
export default EditCard;
