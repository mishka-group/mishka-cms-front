import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import SettingsTemplate from '../../apps/mishka_html/templates/client/user/settings';
import LoginLoading from '../../apps/mishka_html/UIs/LoginLoading';
const SettingsPage: NextPage = () => {
  const { data: session, status } = useSession();

  if (!session) {
    return <LoginLoading />;
  }

  return <SettingsTemplate />;
};

export default SettingsPage;
