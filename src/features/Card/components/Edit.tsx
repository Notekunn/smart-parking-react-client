import { Formik, Form, FastField } from 'formik';
import React, { useState } from 'react';
import { Row, Button, Alert, ButtonGroup } from 'reactstrap';
import InputField from '../../../custom-fields/InputField';
import SelectField from '../../../custom-fields/SelectField';
import * as yup from 'yup';
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
	const { card, cancerEdit } = props;
	const { licence_plate, rfid, owner, status, type } = card;
	const [isActive, setActive] = useState(status !== 'PENDING');
	const handleActiveCard = () => {
		setActive(true);
		console.log('Active card');
	};
	return (
		<Formik
			initialValues={{
				rfid,
				licence_plate,
				owner,
				type,
			}}
			onSubmit={(values, actions) => {
				console.log(values);
			}}
			validationSchema={validationSchema}
		>
			{(formikProp) => {
				const { errors, values, touched } = formikProp;
				console.log({ errors, values, touched });
				return (
					<Form>
						<Row>
							<h4 className="m-auto"> Sửa thẻ </h4>
						</Row>
						{!isActive && <Alert color="danger">Thẻ chưa kích hoạt</Alert>}
						<FastField
							name="rfid"
							component={InputField}
							label="RFID"
							placeholder="249-85-64-178"
							disabled={true}
						/>
						<FastField
							name="licence_plate"
							component={InputField}
							label="Biển kiểm soát"
							placeholder="37A123.."
						/>
						<FastField
							name="owner"
							component={InputField}
							label="Chủ phương tiện"
							placeholder="249-85-64-178"
						/>
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
								{!isActive && (
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
