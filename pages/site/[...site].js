import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites, getSite } from '@/lib/db-admin';
import DashboardShell from '@/components/DashboardShell';
import SiteHeader from '@/components/SiteHeader';

export async function getStaticProps(context) {
  const [siteId, route] = context.params.site;
  const { feedback } = await getAllFeedback(siteId, route);
  console.log(feedback);
  const { site } = await getSite(siteId);
  return {
    props: {
      initialFeedback: feedback,
      site
    },
    unstable_revalidate: 1
  };
}

export async function getStaticPaths() {
  const { sites } = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      site: [site.id.toString()]
    }
  }));

  return {
    paths,
    fallback: true
  };
}

const FeedbackPage = ({ initialFeedback }) => {
  const auth = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState(initialFeedback);
  const [siteId, route] = router.query.site;

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  console.log(initialFeedback);
  console.log(router.query.site);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      siteId,
      route: route || '/',
      author: auth.user.name,
      authorId: auth.user.uid,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    inputEl.current.value = '';
    setAllFeedback([newFeedback, ...allFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <DashboardShell>
      <SiteHeader
        isSiteOwner={true}
        siteName={site?.name}
        siteId={siteId}
        route={route}
      >
        <Box
          display="flex"
          flexDirection="column"
          width="full"
          maxWidth="700px"
          margin="0 auto"
        >
          {auth.user && (
            <Box as="form" onSubmit={onSubmit}>
              <FormControl my={8}>
                <FormLabel htmlFor="comment">Comment</FormLabel>
                <Input
                  ref={inputEl}
                  id="comment"
                  placeholder="Leave a comment"
                />
                <Button
                  mt={4}
                  type="submit"
                  fontWeight="medium"
                  isDisabled={router.isFallback}
                >
                  Add Comment
                </Button>
              </FormControl>
            </Box>
          )}
          {allFeedback &&
            allFeedback.map((feedback) => (
              <Feedback key={feedback.id} {...feedback} />
            ))}
        </Box>
      </SiteHeader>
    </DashboardShell>
  );
};

export default FeedbackPage;
