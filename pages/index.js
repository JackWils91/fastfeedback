import Head from 'next/head';
import { useAuth } from '@/lib/auth';

import { Button, Heading, Text, Code, Icon, Flex } from '@chakra-ui/core';


const Home = () => {
  const auth = useAuth();
  return (

    <Flex
      as="main"
      direction="column"
      align="center"
      justify="center"
      h="100vh"
    >
      <Head>
        <title>Fast Feedback</title>
      </Head>

      <Heading>Fast Feedback</Heading>
      <Icon color="black" name="logo" size="64px" />

      {auth.user ? (
        <Button onClick={() => auth.signout()}>Sign Out</Button>
      ) : (
        <Button mt={4} size="sm" onClick={() => auth.signinWithGithub()}>
          Sign In
        </Button>
      )}
    </Flex>

  );
};

export default Home;
