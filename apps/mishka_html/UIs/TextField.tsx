import type { NextPage } from 'next';

interface TextFieldType {
  name: string;
  placeholder: string;
  type: string;
}

const TextField: NextPage<TextFieldType> = (props): JSX.Element => {
  return (
    <input
      className="form-control"
      name={props.name}
      placeholder={props.placeholder}
      type={props.type}
    />
  );
};

export default TextField;
