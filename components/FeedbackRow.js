import React, { useState } from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/core';

import { Table, Tr, Th, Td } from './Table';
import DeleteFeedbackButton from './DeleteFeedbackButton';
import { updateFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import { mutate } from 'swr';

const FeedbackRow = ({ id, author, text, route, status }) => {
  const auth = useAuth();
  const [checked, setChecked] = useState(status === 'active');

  const toggleFeedback = async () => {
    setChecked(!checked);
    await updateFeedback(id, { status: !checked ? 'active' : 'pending' });
    mutate(['/api/feedback', auth.user.token]);
  };
  return (
    <Box as="tr" key={id}>
      <Td fontWeight="medium">{author}</Td>
      <Td>{text}</Td>
      <Td>
        <Code>{route || '/'}</Code>
      </Td>
      <Td>
        <Switch color="green" onChange={toggleFeedback} isChecked={checked} />
      </Td>
      <Td>
        <DeleteFeedbackButton feedbackId={id} />
      </Td>
    </Box>
  );
};

export default FeedbackRow;
