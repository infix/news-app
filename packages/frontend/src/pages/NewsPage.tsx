import React, { useState } from "react";
import { Layout } from "antd";
import { NewsFeedOptionsSelector } from "../components/NewsFeedOptionsSelector";
import { NewsFeed } from "../components/NewsFeed";

export const NewsPage = () => {
  const [country, setCountry] = useState("eg");
  const [category, setCategory] = useState("sports");

  return (
    <Layout style={{ minHeight: "100vh", alignItems: "center" }}>
      <Layout.Content style={{ width: "40rem", padding: "1rem" }}>
        {/* Not the cleanest implementation but this will do */}
        <NewsFeedOptionsSelector
          {...{ setCountry, setCategory, category, country }}
        />
        <NewsFeed category={category} country={country} />
      </Layout.Content>
    </Layout>
  );
};
