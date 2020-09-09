import React from 'react';
import {
  Flex,
  Icon,
  Link,
  Stack,
  Avatar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Box,
  Text,
  Button
} from '@chakra-ui/core';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const auth = useAuth();

  return (
    <Flex flexDirection="column">
      <Flex
        flexDirection="row"
        justifyContent="space-between"
        backgroundColor="white"
        py={4}
        px={8}
      >
        <Stack isInline spacing={4} align="center">
          <Icon name="logo" color="black" size="24px" />
          <Link>Sites</Link>
          <Link>Feedback</Link>
        </Stack>
        <Flex alignItems="center">
          <Link mr={4}>Account</Link>
          <Avatar size="sm" src={auth.user.photoUrl} />
        </Flex>
      </Flex>
      <Flex backgroundColor="gray.100" p={8} height="100vh">
        <Flex maxWidth="800px" w="100%" mr="auto" ml="auto" direction="column">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.700" fontSize="sm">
                Sites
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Heading color="black" mb={4}>
            Sites
          </Heading>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardShell;
