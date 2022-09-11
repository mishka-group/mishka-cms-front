import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import ClientAlert from '../../../components/notices/clientAlert';
// TODO: {styles.rtl} or {styles.ltr} should be changed by multi-language support

const Main: NextPage = () => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Home" />
      <div className="container">
        <section className="col mx-auto client-content">
        <ClientAlert />
        </section>
      </div>
    </div>
  );
};

export default Main;
