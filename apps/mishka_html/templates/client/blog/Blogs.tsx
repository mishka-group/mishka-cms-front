import type { NextPage } from 'next';
import MainHeader from '../../../UIs/MainHeader';
import ClinetMainMenu from '../../../components/navigation/ClinetMainMenu';

const Blogs: NextPage = () => {
  return (
    <div id="clientMain">
      <MainHeader />
      <ClinetMainMenu active="Blog" />
    </div>
  );
};

export default Blogs;
