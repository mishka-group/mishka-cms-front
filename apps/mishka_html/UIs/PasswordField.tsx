import type { NextPage } from 'next';

interface PasswordFieldType {
  name: string;
  placeholder: string;
  autoComplete?: string
}

const PasswordField: NextPage<PasswordFieldType> = (props): JSX.Element => {
  return (
    <input
      autoComplete={props.autoComplete ?  props.autoComplete : "off"}
      className="form-control"
      name={props.name}
      placeholder={props.placeholder}
      type="password"
    />
  );
};

export default PasswordField;
