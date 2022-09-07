import React from 'react';

interface PasswordFieldType {
  name: string;
  placeholder: string;
  autoComplete?: string;
  ref: any
}

const PasswordField = React.forwardRef(
  (props: PasswordFieldType, ref: any) => (
    <input
      autoComplete={props.autoComplete ? props.autoComplete : 'off'}
      className="form-control"
      name={props.name}
      placeholder={props.placeholder}
      type="password"
      ref={ref}
    />
  )
);

export default PasswordField;
