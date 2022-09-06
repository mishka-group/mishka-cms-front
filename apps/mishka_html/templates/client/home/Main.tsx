import type { NextPage } from 'next';
import styles from './Main.module.css';
import MainHeader from './MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';

// TODO: {styles.rtl} or {styles.ltr} should be changed by multi-language support

const Main: NextPage = () => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu />
    </div>
  );
};

export default Main;
