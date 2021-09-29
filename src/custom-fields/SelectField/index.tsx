import { ErrorMessage } from 'formik';
import React from 'react';
import Select from 'react-select';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
export interface SelectFieldProps {
	field: any;
	form: any;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	options: IOption[];
}
interface IOption {
	value: any;
}
const SelectField: React.FC<SelectFieldProps> = (props: SelectFieldProps) => {
	const { field, options, label, form, placeholder, disabled } = props;
	const { name, value } = field;
	const { errors, touched } = form;
	const showError = errors[name] && touched[name];
	const selectedOption = options.find((option) => option.value === value);

	const handleSelectedOptionChange = (selectedOption: IOption) => {
		const selectedValue = selectedOption ? selectedOption.value : '';

		const changeEvent = {
			target: {
				name: name,
				value: selectedValue,
			},
		};
		field.onChange(changeEvent);
	};

	return (
		<FormGroup>
			{label && <Label for={name}>{label}</Label>}
			<Select
				id={name}
				{...field}
				value={selectedOption}
				onChange={handleSelectedOptionChange}
				placeholder={placeholder}
				isDisabled={disabled}
				options={options}
				className={showError ? 'is-invalid' : ''}
			/>
			<ErrorMessage name={name} component={FormFeedback} />
		</FormGroup>
	);
};
export default SelectField;

SelectField.defaultProps = {
	label: '',
	placeholder: '',
	disabled: false,
	// options: [],
};
