import { SimpleGrid, Text } from "@chakra-ui/react";
import { Auth } from "@supabase/ui";
import React from "react";
import { ColumnContainer } from "../components/ColumnContainer";
import Layout from "../components/Layout";
import { supabase } from "../utils/supabase";

const IndexPage = () => {
  const { user } = Auth.useUser();

  console.log(user);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <SimpleGrid columns={2} spacing={10}>
        <Text fontSize="xl">(xl) In love with React & Next</Text>
        <Auth
          supabaseClient={supabase}
          onlyThirdPartyProviders
          providers={["google"]}
        />
      </SimpleGrid>
    </Layout>
  );
};

export default IndexPage;
