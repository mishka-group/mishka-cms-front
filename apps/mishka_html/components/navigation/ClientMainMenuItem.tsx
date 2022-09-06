import Link from 'next/link';

interface MenuItem {
  title: string;
  link: string;
  active: boolean;
}

// TODO: change link and li to another componnet and using link
const ClientMainMenuItem = (props: MenuItem): JSX.Element => {
  return (
    <li className="nav-item client-menu-nav-item">
      <Link href={props.link}>
        <a
          className={`nav-link client-menu-nav-link ${
            props.active ? 'active' : ''
          }`}
        >
          {props.title}
        </a>
      </Link>
    </li>
  );
};

export default ClientMainMenuItem;
