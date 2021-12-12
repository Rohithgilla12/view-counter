import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Auth, Button } from "@supabase/ui";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { MyAssets } from "../components/MyAssets";
import { supabase } from "../utils/supabase";

interface Asset {
  id: number;
  created_at: Date;
  views: number;
  slug: string | null;
  url: string;
  owner: string;
}

interface MyAssetsProps {
  error: any;
  assets: Asset[];
}

const IndexPage: React.FC<MyAssetsProps> = ({ error, assets }) => {
  // TODO: getServerSideProps to get list of assets of the logged in user

  const { user } = Auth.useUser();

  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState("");
  const [createdData, setCreatedData] = useState<any>(null);

  useEffect(() => {
    setRedirectUrl(window.location.href);
  }, []);

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
                const slug = (e.target as any).slug.value as string;
                const url = (e.target as any).url.value as string;

                const { data, error } = await supabase.from("asset").insert([
                  {
                    slug: slug.length === 0 ? null : slug,
                    url: url,
                    owner: user.id,
                  },
                ]);

                if (error) {
                  // Handle error
                  console.log(error);
                } else {
                  console.log(data[0]);
                  setEmbedUrl(`${window.location.href}${data[0].id}`);
                }
              }}
            >
              <FormControl id="url">
                <FormLabel>URL</FormLabel>
                <Input name="url" type="url" required={true} />
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
            <Box height={8} />

            {embedUrl === null ? (
              <Center>
                <Text>Will be generated after you have clicked Create</Text>
              </Center>
            ) : (
              <Center>
                <Flex direction={"row"}>
                  <Text>{embedUrl}</Text>
                  <Box width={8} />
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(embedUrl);
                    }}
                    aria-label="Copy URL"
                    icon={<CopyIcon />}
                  />
                </Flex>
              </Center>
            )}
          </Box>
        </SimpleGrid>
        <MyAssets assets={assets} error={error} />
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
        redirectTo={redirectUrl}
        providers={["google"]}
      />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // will have to use getUserByCookie later supabase.
  const { user } = await supabase.auth.api.getUserByCookie(context.req);

  if (user == null) {
    return {
      props: {
        error: { message: "User not logged in" },
        assets: [],
      },
    };
  }

  const { data, error } = await supabase
    .from("asset")
    .select("*")
    .eq("owner", user.id);

  if (error) {
    console.error(error);
    return {
      props: {
        error: error,
        assets: [],
      },
    };
  }

  return {
    props: {
      assets: data,
    }, // will be passed to the page component as props
  };
};

export default IndexPage;
