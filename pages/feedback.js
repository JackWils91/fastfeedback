import Head from 'next/head';
import useSWR from 'swr';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/core';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTable';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';

import { useAuth } from '@/lib/auth';
import FeedbackTable from '@/components/FeedbackTable';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';

const MyFeedback = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/feedback', user.token] : null, fetcher);
  console.log(data);
  if (!data) {
    return (
      <DashboardShell>
        <FeedbackTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <FeedbackTableHeader />
      {data.feedback.length ? (
        <FeedbackTable allFeedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
};

export default MyFeedback;
