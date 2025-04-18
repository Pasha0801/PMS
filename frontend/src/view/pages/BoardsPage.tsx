import { observer } from 'mobx-react-lite';
import { Layout } from '#view/shared/components';
import { Header, Boards } from '#view/features';

export const BoardsPage = observer(function BoardsPage() {
  return (
    <Layout header={<Header />}>
      <Boards />
    </Layout>
  );
});
