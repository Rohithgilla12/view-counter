import Head from "next/head";
import { Box, Center } from "@chakra-ui/react";

import { DarkModeSwitch } from "./DarkModeSwitch";
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <Center>
    <Box maxH="100%" maxW="80%" p={8}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DarkModeSwitch />
      {children}
    </Box>
  </Center>
);

export default Layout;
