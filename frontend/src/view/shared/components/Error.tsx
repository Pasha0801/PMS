import { Box, Button, Typography } from '@mui/material';

type ErrorPros = {
  onClick: () => void;
  title?: string;
  buttonTitle?: string;
};

export const Error = ({
  onClick,
  title = 'Не удалось загрузить данные!',
  buttonTitle = 'На главную',
}: ErrorPros) => {
  return (
    <Box
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      height={'100%'}
      flexDirection={'column'}
    >
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <Button variant="outlined" onClick={onClick}>
        {buttonTitle}
      </Button>
    </Box>
  );
};
