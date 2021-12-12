import { Box, Link as ChakraLink, Text } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Layout from "../../components/Layout";
import { supabase } from "../../utils/supabase";

interface AssetAnalytics {
  id: string;
  created_at: Date;
  asset: number;
}

interface ReChartData {
  name: string;
  views: number;
}

interface StatsProps {
  mapData: { date: Date; analytics: AssetAnalytics[] };
  reChartData: ReChartData[];
  url: string;
}

const Stats: React.FC<StatsProps> = ({ mapData, reChartData, url }) => {
  return (
    <Layout title="Home | Stats">
      <Link href="/">
        <ChakraLink color="teal.600">Back</ChakraLink>
      </Link>
      <Text my={8}>
        Stats for the URL{" "}
        <ChakraLink color="teal.500" isExternal={true}>
          {url}
        </ChakraLink>
      </Text>
      <Box h={"100vh"}>
        <ResponsiveContainer width="100%" height="50%">
          <LineChart width={500} height={300} data={reChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="views"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  const { data: asset, error: assetError } = await supabase
    .from("asset")
    .select("*")
    .eq("id", id);

  if (assetError) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  const { data, error } = await supabase
    .from("analytics")
    .select("*")
    .eq("asset", id)
    .order("created_at");
  const assetMapData: any = {};

  if (error) {
    return {
      props: {
        error: error,
        mapData: assetMapData,
        reChartDate: [],
        url: "",
      },
    };
  }

  data.forEach((element) => {
    var date = element["created_at"];
    date = new Date(date);
    const dateString = date.toDateString();
    if (assetMapData[dateString] === undefined) {
      assetMapData[dateString] = [element];
    } else {
      assetMapData[dateString].push(element);
    }
  });

  // convert data required for recharts

  const reChartData = [];
  Object.keys(assetMapData).forEach((key) => {
    reChartData.push({ name: key, views: assetMapData[key].length });
  });

  console.log(asset);

  return {
    props: {
      mapData: assetMapData,
      reChartData: reChartData,
      url: asset[0]["url"],
    },
  };
};
export default Stats;
