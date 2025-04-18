import { Box, Typography, TextField, Button } from '@mui/material';

type TasksFilterBarProps = {
  value?: string;
  onClickButton?: () => void;
};

export const TasksSearchFilterBar = ({
  value,
  onClickButton,
}: TasksFilterBarProps) => {
  return (
    <Box display={'flex'} justifyContent={'space-between'} m={1}>
      <TextField
        label="Поиск"
        value={value}
        variant="outlined"
        data-testid="search-input"
      />
      <Button
        variant="contained"
        onClick={onClickButton}
        sx={{ width: 210, textTransform: 'none' }}
      >
        <Typography variant="h5">Фильтр</Typography>
      </Button>
    </Box>
  );
};
