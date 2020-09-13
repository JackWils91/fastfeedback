import Head from 'next/head';
import useSWR from 'swr';
import { Button, Flex, Text, Code, Icon } from '@chakra-ui/core';

import EmptyState from '@/components/EmptyState';
import SiteTableSkeleton from '@/components/SiteTable';
import DashboardShell from '@/components/DashboardShell';
import fetcher from '@/utils/fetcher';

import { useAuth } from '@/lib/auth';
import SiteTable from '@/components/SiteTable';
import SiteTableHeader from '@/components/SiteTableHeader';

const Dashboard = () => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
