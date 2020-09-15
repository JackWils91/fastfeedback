import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Flex
} from '@chakra-ui/core';

import AddSiteModal from './AddSiteModal';

const SiteTableHeader = ({ isPaidAccount }) => (
  <>
    <Breadcrumb>
      <BreadcrumbItem>
        <BreadcrumbLink>Sites</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
    <Flex justifyContent="space-between">
      <Heading mb={8}>My Sites</Heading>
      {isPaidAccount && <AddSiteModal>+ Add Site</AddSiteModal>}
    </Flex>
  </>
);

export default SiteTableHeader;
