import { Formik, Form, FastField } from 'formik';
import React from 'react';
import { InputGroup, Input, FormGroup, Label, Col, Row, Button } from 'reactstrap';
import InputField from '../../custom-fields/InputField';
import SelectField from '../../custom-fields/SelectField';
import * as yup from 'yup';
export interface AddCardProps {}
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
export default function AddCard(props: AddCardProps) {
	return (
		<Formik
			initialValues={{
				rfid: '',
				licence_plate: '',
				owner: '',
				type: '',
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
							<h4 className="m-auto"> Thêm thẻ </h4>
						</Row>
						<FastField
							name="rfid"
							component={InputField}
							label="RFID"
							placeholder="249-85-64-178"
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
						<Button>Submit</Button>
					</Form>
				);
			}}
		</Formik>
	);
}
