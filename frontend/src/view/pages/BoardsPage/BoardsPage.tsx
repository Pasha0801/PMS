import { observer } from 'mobx-react-lite';

import { Boards, Header, HeaderLink } from '#view/features';
import { Error, Layout, Preloader } from '#view/shared/components';

import { BoardsPageModel } from './model';

type BoardsPageComponentProps = {
  model: BoardsPageModel;
};

const BoardsPageComponent = observer(({ model }: BoardsPageComponentProps) => {
  if (model.isLoading) {
    return (
      <Layout>
        <Preloader />
      </Layout>
    );
  }

  if (model.isError) {
    return (
      <Layout>
        <Error onClick={model.navigateTasksPage} />
      </Layout>
    );
  }

  return (
    <Layout
      header={
        <Header
          activeLink={HeaderLink.BOARD}
          onClickCreateTask={model.createNewTask}
        />
      }
    >
      <Boards boards={model.boards} />
    </Layout>
  );
});

export const BoardsPage = () => {
  const model = new BoardsPageModel();
  return <BoardsPageComponent model={model} />;
};
