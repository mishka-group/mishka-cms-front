import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
// TODO: {styles.rtl} or {styles.ltr} should be changed by multi-language support

const Main: NextPage = () => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Home" />
    </div>
  );
};

export default Main;
