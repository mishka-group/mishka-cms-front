import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';
import Alert from '../../../components/notices/Alert';
import type { PostsResponse } from '../../../../mishka_content/content';

// TODO: {styles.rtl} or {styles.ltr} should be changed by multi-language support

interface HomeTemplateTypes {
  posts: PostsResponse;
}

const Main: NextPage<HomeTemplateTypes> = ({ posts }) => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Home" />
      <div className="container">
        <section className="col mx-auto client-content">
          <Alert />
        </section>
      </div>
    </div>
  );
};

export default Main;
