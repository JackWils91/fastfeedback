import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTable from '@/components/FeedbackTable';
import SiteFeedbackTableHeader from '@/components/FeedbackTableHeader';
import FeedbackTableSkeleton from '@/components/FeedbackTableSkeleton';
import Page from '@/components/Page';
import { useRouter } from 'next/router';
import FeedbackEmptyState from '@/components/FeedbackEmptyState';

const SiteFeedback = () => {
  const { user } = useAuth();
  const { query } = useRouter();

  const { data } = useSWR(
    user ? [`/api/feedback/${query.siteId}`, user.token] : null,
    fetcher
  );

  if (!data) {
    return (
      <DashboardShell>
        <SiteFeedbackTableHeader />
        <FeedbackTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <SiteFeedbackTableHeader siteName={data.site.name} />
      {data.feedback.length ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <FeedbackEmptyState />
      )}
    </DashboardShell>
  );
};

const SiteFeedbackPage = () => (
  <Page name="My Feedback" path="/feedback">
    <SiteFeedback />
  </Page>
);

export default SiteFeedbackPage;
