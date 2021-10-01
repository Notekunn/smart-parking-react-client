import { ErrorMessage } from 'formik'
import React from 'react'
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap'
export interface InputFieldProps {
	field: any
	form: any
	label?: string
	placeholder?: string
	disabled?: boolean
	options?: any
	type?: InputType
}
const InputField: React.FC<InputFieldProps> = (props: InputFieldProps) => {
	const { field, form, type, label, placeholder, disabled } = props
	const { name } = field
	const { errors, touched } = form
	const showError = errors[name] && touched[name]
	return (
		<FormGroup>
			{label && <Label for={name}>{label}</Label>}

			<Input
				id={name}
				{...field}
				type={type}
				disabled={disabled}
				placeholder={placeholder}
				invalid={showError}
			/>
			<ErrorMessage name={name} component={FormFeedback} />
		</FormGroup>
	)
}
export default InputField

InputField.defaultProps = {
	type: 'text',
	label: '',
	disabled: false,
}
