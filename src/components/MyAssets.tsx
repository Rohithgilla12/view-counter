import { CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  IconButton,
  Link as ChakraLink,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { format } from "timeago.js";

const NETLIFY_IMAGE_EMBED =
  "https://relaxed-joliot-41cdfa.netlify.app/.netlify/functions/counter?id=";

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

export const MyAssets: React.FC<MyAssetsProps> = ({ error, assets }) => {
  return (
    <Table size="md" variant={"striped"}>
      <TableCaption>Created Assets</TableCaption>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Created</Th>
          <Th>URL</Th>
          <Th>Slug</Th>
          <Th>Embed IFrame Link</Th>
          <Th>Embed PNG</Th>
          <Th>Stats</Th>
        </Tr>
      </Thead>
      <Tbody>
        {assets.map((asset) => (
          <Tr key={asset.id}>
            <Td>{asset.id}</Td>
            <Td>{format(asset.created_at)}</Td>
            <Td w={"30%"}>
              <ChakraLink color="teal.500" isExternal={true}>
                {asset.url}
              </ChakraLink>
            </Td>
            <Td>{asset.slug ?? ""}</Td>
            <Td>
              {" "}
              <Flex direction={"row"}>
                {/* <Text>{`${window.location.href}api/view/${asset.id}`}</Text>
                <Box width={8} /> */}
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.href}api/view/${asset.id}`
                    );
                  }}
                  aria-label="Copy URL"
                  icon={<CopyIcon />}
                />
              </Flex>
            </Td>
            <Td>
              {" "}
              <Flex direction={"row"}>
                {/* <Text>{`${NETLIFY_IMAGE_EMBED}${asset.id}`}</Text> */}
                {/* <Box width={8} /> */}
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${NETLIFY_IMAGE_EMBED}${asset.id}`
                    );
                  }}
                  aria-label="Copy URL"
                  icon={<CopyIcon />}
                />
              </Flex>
            </Td>
            <Td>
              <Link href={`/stats/${asset.id}`}>
                <a>
                  <ChakraLink>View Stats</ChakraLink>
                </a>
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
