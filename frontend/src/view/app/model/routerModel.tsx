import { makeAutoObservable } from 'mobx';
import { ReactNode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router';

import { BoardPage, BoardsPage, TasksPage, NotFoundPage } from '#view/pages';

class RouterModel {
  private router: ReturnType<typeof createBrowserRouter> | null = null;

  constructor() {
    makeAutoObservable(this);

    this.router = createBrowserRouter(this.pages);
  }

  public navigate = (path: string) => {
    if (this.router) {
      this.router.navigate(path);
    }
  };

  public getCurrentLocation = () => {
    return this.router?.state.location.pathname ?? '';
  };

  public get Component(): ReactNode {
    return this.router ? <RouterProvider router={this.router} /> : null;
  }

  private get pages() {
    return [
      {
        path: '/boards',
        element: <BoardsPage />,
      },
      {
        path: '/issues',
        element: <TasksPage />,
      },
      {
        path: '/board/:id',
        element: <BoardPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ];
  }
}

export const routerModel = new RouterModel();
