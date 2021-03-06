import { Avatar, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import ActivityParser from './ActivityParser';

const ActivityItem = ({ activity }) => {
  const { user } = useSelector((state) => state?.auth);

  return (
    <Box sx={{ display: 'flex', py: 1, alignItems: 'center' }}>
      <Avatar
        sx={{
          width: '32px',
          height: '32px',
          color: 'black',
          fontSize: '12px',
          fontWeight: 700,
          backgroundColor: '#DFE1E6',
        }}
      >
        {user.firstName[0]}
      </Avatar>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', ml: 2, flexGrow: 1 }}
      >
        {/* ------------------------------ Activity description ----------------------------- */}
        <Typography
          component={'div'}
          sx={{ lineHeight: '20px', fontSize: '14px', color: '#172B4D' }}
        >
          <span
            style={{
              lineHeight: '20px',
              fontSize: '14px',
              color: '#172B4D',
              fontWeight: 700,
            }}
          >
            {user.firstName}
          </span>{' '}
          <ActivityParser activity={activity} />
        </Typography>
      </Box>
    </Box>
  );
};

export default ActivityItem;
