import React from 'react';
import NextLink from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex
} from '@chakra-ui/core';

const SiteFeedbackTableHeader = ({ siteName }) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <NextLink href="/feedback" passHref>
          <BreadcrumbLink>Feedback</BreadcrumbLink>
        </NextLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink>{siteName || '-'}</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>{siteName || '-'}</Heading>
    </Flex>
  </>
);

export default SiteFeedbackTableHeader;
