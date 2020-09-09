import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Button, Heading, Text, Code, Icon, Flex } from '@chakra-ui/core';
import EmptyState from '@/components/EmptyState';

const Dashboard = () => {
  const auth = useAuth();

  if (!auth.user) {
    return 'Loading...';
  }
  return <EmptyState />;
};

export default Dashboard;
