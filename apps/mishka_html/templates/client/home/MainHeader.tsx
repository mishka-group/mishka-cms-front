import type { NextPage } from 'next';
import Image from 'next/image';
import styles from './Main.module.css';
import webSiteLogo from '../../../../../public/mylogo.png';

// TODO: {styles.rtl} or {styles.ltr} should be changed by multi-language support

const MainHeader: NextPage = () => {
  return (
    <div id="clientMainHeader" className="container">
      <header className={`col mx-auto ${styles.clientHeader}`}>
        <div className="py-5 mt-4 text-center">
          <Image
            src={webSiteLogo}
            alt="TODO: should be change"
            width={198}
            height={136}
          />
        </div>
      </header>
    </div>
  );
};

export default MainHeader;
