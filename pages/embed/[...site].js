import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/core';

import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);

  return {
    props: {
      initialFeedback: feedback
    },
    unstable_revalidate: 1
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: site.id.toString()
    }
  }));

  return {
    paths,
    fallback: true
  };
}

const EmbeddedFeedbackPage = ({ initialFeedback }) => {
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" width="full">
      <FeedbackLink siteId={router.query.site} />
      {initialFeedback?.length ? (
        initialFeedback.map((feedback) => (
          <Feedback
            key={feedback.id}
            isLast={index === initialFeedback.length - 1}
            {...feedback}
          />
        ))
      ) : (
        <Box>There are no comments for this site.</Box>
      )}
    </Box>
  );
};

export default EmbeddedFeedbackPage;
