import type { NextPage } from 'next';
interface CollapseButtonType {
  target: string;
  label: string;
  expanded: boolean;
  children: JSX.Element;
}

const CollapseButton: NextPage<CollapseButtonType> = (props): JSX.Element => {
  return (
    <div>
      <button
        className="navbar-toggler navbar-dark"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${props.target}`}
        aria-controls={`${props.target}`}
        aria-expanded={`${props.expanded}`}
        aria-label={`${props.label}`}
      >
        {props.children}
      </button>
    </div>
  );
};

export default CollapseButton;
