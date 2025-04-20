import { observer } from 'mobx-react-lite';

import { Header, Boards } from '#view/features';
import { Layout } from '#view/shared/components';

export const BoardsPage = observer(function BoardsPage() {
  return (
    <Layout header={<Header />}>
      <Boards />
    </Layout>
  );
});
