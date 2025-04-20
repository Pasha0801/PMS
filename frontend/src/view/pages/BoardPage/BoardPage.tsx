import { observer } from 'mobx-react-lite';

import { Board, Header, HeaderLink } from '#view/features';
import { Error, Layout, Preloader } from '#view/shared/components';

import { BoardPageModel } from './model';

type BoardPageComponentProps = {
  model: BoardPageModel;
};

const BoardPageComponent = observer(({ model }: BoardPageComponentProps) => {
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
      <Board
        tasks={model.tasks}
        board={model.board}
        getBoardTasks={model.getBoardTasks}
      />
    </Layout>
  );
});

export const BoardPage = () => {
  const model = new BoardPageModel();
  return <BoardPageComponent model={model} />;
};
