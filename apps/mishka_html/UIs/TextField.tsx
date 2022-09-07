import React from 'react';

interface TextFieldType {
  name: string;
  placeholder: string;
  type: string;
  ref: any
}

const TextField = React.forwardRef((props: TextFieldType, ref: any) => (
  <input
    className="form-control"
    name={props.name}
    placeholder={props.placeholder}
    type={props.type}
    ref={ref}
  />
));
export default TextField;
