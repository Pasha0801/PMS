import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';

import { Filter, Search } from './components';
import { ToolbarModel } from './model';
import { ToolbarOnChange } from './types';

type ToolbarComponentProps = {
  model: ToolbarModel;
  toolbarHeight: string;
};

const ToolbarComponent = observer(
  ({ model, toolbarHeight }: ToolbarComponentProps) => {
    return (
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        m={1}
        height={toolbarHeight}
      >
        <Search model={model} />
        <Filter model={model} />
      </Box>
    );
  },
);

export type ToolbarProps = {
  onChange: (value: ToolbarOnChange) => void;
  toolbarHeight: string;
};

export const Toolbar = React.memo((props: ToolbarProps) => {
  const model = new ToolbarModel(props);
  return <ToolbarComponent model={model} toolbarHeight={props.toolbarHeight} />;
});
