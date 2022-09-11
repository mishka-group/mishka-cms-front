import React from 'react';

interface TextFieldType {
  name: string;
  placeholder: string;
  type: string;
  ref: any;
  formError?: any;
  // required field should be optional because we need to skip this if it is not sent and put default value instead of.
  required?: boolean
}

const TextField = React.forwardRef((props: TextFieldType, ref: any) => {
  return (
    <>
      <input
        className={`form-control ${props.formError && Object.hasOwn(props.formError, props.name) ? 'is-invalid' : ''}`}
        name={props.name}
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
