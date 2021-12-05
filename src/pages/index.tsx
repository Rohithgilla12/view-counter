import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Auth, Button } from "@supabase/ui";
import React from "react";
import Layout from "../components/Layout";
import { supabase } from "../utils/supabase";

const IndexPage = () => {
  const { user } = Auth.useUser();

  if (user) {
    return (
      <Layout title="Home | Create">
        <Heading textAlign="center" as="h2" color="#26b37d">
          Create View Counter
        </Heading>
        <SimpleGrid mt={8} columns={{ sm: 1, md: 2, lg: 2 }} spacing={8}>
          <Box>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                const slug = (e.target as any).slug.value;
                const url = (e.target as any).url.value;

                const { data, error } = await supabase.from("asset").insert([
                  {
                    slug: slug,
                    url: url,
                    owner: user.id,
                  },
                ]);

                if (error) {
                  // Handle error
                  console.log(error);
                } else {
                  console.log(data);
                }
              }}
            >
              <FormControl id="url">
                <FormLabel>URL</FormLabel>
                <Input name="url" type="url" />
                <FormHelperText>
                  This is optional, it is for the url which you want to track
                  views
                </FormHelperText>
              </FormControl>
              <FormControl id="slug">
                <FormLabel>Slug</FormLabel>
                <Input name="slug" type="text" />
                <FormHelperText>
                  This is optional too, if you don't provide a slug, we generate
                  an id for you
                </FormHelperText>
              </FormControl>
              <Box h={4} />
              <Button type="primary" block htmlType="submit">
                Create
              </Button>
            </form>
          </Box>
          <Box>
            <Text textAlign="center" fontSize="lg">
              Embed URL
            </Text>
          </Box>
        </SimpleGrid>
      </Layout>
    );
  }
  return (
    <Layout title="Home | Login">
      <Heading textAlign="center" as="h2" color="#26b37d">
        Login
      </Heading>
      <Auth
        supabaseClient={supabase}
        onlyThirdPartyProviders
        providers={["google"]}
      />
    </Layout>
  );
};

export default IndexPage;
