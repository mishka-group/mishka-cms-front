import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import type { NextPage } from 'next';

const LoginTemplates: NextPage = (props) => {
  // TODO: token or user session exist?
  // TODO: if exist is valid? based on accsess token time
  // TODO: try to load Google recaptcha and CSRF with next or with server API in next version
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Login" />
    </div>
  );
};

export default LoginTemplates;
