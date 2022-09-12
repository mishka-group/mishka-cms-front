import React from 'react';

interface PasswordFieldType {
  name: string;
  placeholder: string;
  autoComplete?: string;
  ref: any;
  formError?: any;
  // required field should be optional because we need to skip this if it is not sent and put default value instead of.
  required?: boolean
}

// This function helps us to pass Ref in nested component and manage the Ref in parent component
// This component is used for (password) field
const PasswordField = React.forwardRef((props: PasswordFieldType, ref: any) => {
  return (
    <>
      <input
        id={props.name}
        autoComplete={props.autoComplete ? props.autoComplete : 'off'}
        className={`form-control ${props.formError && Object.hasOwn(props.formError, props.name) ? 'is-invalid' : ''}`}
        name={props.name}
        placeholder={props.placeholder}
        type="password"
        ref={ref}
        required={props.required ? props.required : false}
      />
      {props.formError && Object.hasOwn(props.formError, props.name) && <div className="invalid-feedback">{props.formError[props.name][0]}</div>}
    </>
  );
});

export default PasswordField;
