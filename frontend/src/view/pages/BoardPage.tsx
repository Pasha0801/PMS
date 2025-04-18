import { observer } from 'mobx-react-lite';
import { Layout } from '#view/shared/components';
import { Board, Header } from '#view/features';

export const BoardPage = observer(function BoardPage() {
  return (
    <Layout header={<Header />}>
      <Board />
    </Layout>
  );
});
