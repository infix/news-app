import React, { useMemo } from "react";
import { List, Spin } from "antd";
import { gql } from "apollo-boost";
import { Headline } from "./Headline";
import { useQuery } from "@apollo/react-hooks";

const GET_NEWS = gql`
  query GET_NEWS($category: String!, $country: String!) {
    news(category: $category, country: $country) {
      source {
        id
        name
      }
      author
      content
      publishedAt
      title
      url
      urlToImage
    }
  }
`;

export const FAVOURITES = gql`
  {
    favourites {
      url
    }
  }
`;

export interface Article {
  source: {
    id: string;
    name: string;
  };
  author: string;
  content: string;
  publishedAt: Date;
  title: string;
  url: string;
  urlToImage: string;
}

type Props = { country: string; category: string };
type FavData = { favourites: { url: string }[] };

export const NewsFeed: React.FC<Props> = ({ country, category }) => {
  const { data: favData, loading: favLoading } = useQuery<FavData>(FAVOURITES);
  const { data, loading } = useQuery<{ news: Article[] }, Props>(GET_NEWS, {
    variables: { country, category },
  });

  const favourites = useMemo(
    () => new Set(favData?.favourites.map(f => f.url) || []),
    [favData],
  );

  if (loading || favLoading) return <Spin size="large" />;

  return (
    <List style={{ width: "100%" }}>
      {data?.news.map(article => (
        <Headline
          key={article.url}
          isFavourite={favourites.has(article.url)}
          article={article as any}
        />
      ))}
    </List>
  );
};
