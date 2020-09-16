import React from 'react';
import { Box, Heading, Text, Divider, Icon } from '@chakra-ui/core';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt, settings }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
      {author}
    </Heading>
    {settings?.icons && (
      <Icon name={provider.slice(0, -4)} size="13px" ml="6px" />
    )}
    {settings?.timestamp && (
      <Text color="gray.500" mb={4} fontSize="xs">
        {format(parseISO(createdAt), 'PPpp')}
      </Text>
    )}
    <Text color="gray.800">{text}</Text>
    {!isLast && (
      <Divider
        borderColor="gray.200"
        backgroundColor="gray.200"
        mt={6}
        mb={6}
      />
    )}
  </Box>
);

export default Feedback;
