import React from 'react';

interface TextFieldType {
  name: string;
  placeholder: string;
  autoComplete?: string;
  type: string;
  ref: any;
  formError?: any;
  // required field should be optional because we need to skip this if it is not sent and put default value instead of.
  required?: boolean
}

// This function helps us to pass Ref in nested component and manage the Ref in parent component
// This component is used for (text, email) field
const TextField = React.forwardRef((props: TextFieldType, ref: any) => {
  return (
    <>
      <input
        id={props.name}
        name={props.name}
        autoComplete={props.autoComplete ? props.autoComplete : 'off'}
        className={`form-control ${props.formError && Object.hasOwn(props.formError, props.name) ? 'is-invalid' : ''}`}
        placeholder={props.placeholder}
        type={props.type}
        ref={ref}
        required={props.required ? props.required : false}
      />
      {props.formError && Object.hasOwn(props.formError, props.name) && <div className="invalid-feedback">{props.formError[props.name][0]}</div>}
    </>
  );
});
export default TextField;
