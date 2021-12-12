import {
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { format } from "timeago.js";

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
    <Table size="md" variant={"simple"}>
      <TableCaption>Created Assets</TableCaption>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Created</Th>
          <Th>URL</Th>
          <Th>Slug</Th>
        </Tr>
      </Thead>
      <Tbody>
        {assets.map((asset) => (
          <Tr key={asset.id}>
            <Td>{asset.id}</Td>
            <Td>{format(asset.created_at)}</Td>
            <Td w={"50%"}>
              <Link color="teal.500" isExternal={true}>
                {asset.url}
              </Link>
            </Td>
            <Td>{asset.slug ?? ""}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
