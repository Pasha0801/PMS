import { observer } from 'mobx-react-lite';

import { Board, Header } from '#view/features';
import { Layout } from '#view/shared/components';

export const BoardPage = observer(function BoardPage() {
  return (
    <Layout header={<Header />}>
      <Board />
    </Layout>
  );
});
