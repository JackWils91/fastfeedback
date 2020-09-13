import Head from 'next/head';
import useSWR from 'swr';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/core';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTable';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';

import { useAuth } from '@/lib/auth';
import SiteTable from '@/components/SiteTable';

const Dashboard = () => {
  const auth = useAuth();
  const { data } = useSWR('/api/sites', fetcher);

  console.log(data);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
