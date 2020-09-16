import React from 'react';
import { Box, Heading, Text, Divider, Flex, Icon } from '@chakra-ui/core';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt, provider }) => (
  <Box borderRadius={4} maxWidth="700px" w="full">
    <Flex align="center">
      <Heading size="sm" as="h3" mb={0} color="gray.900" fontWeight="medium">
        {author}
      </Heading>
      <Icon name={provider.slice(0, -4)} size="13px" ml="6px" />
    </Flex>
    <Text color="gray.500" mb={4} fontSize="xs">
      {format(parseISO(createdAt), 'PPpp')}
    </Text>
    <Text color="gray.800">{text}</Text>
    <Divider borderColor="gray.200" backgroundColor="gray.200" mt={8} mb={8} />
  </Box>
);

export default Feedback;
