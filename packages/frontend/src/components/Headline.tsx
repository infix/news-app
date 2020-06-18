import React, { useCallback, useMemo } from "react";
import { Card, Typography } from "antd";
import { Article, FAVOURITES } from "./NewsFeed";
import { HeartOutlined, HeartTwoTone, LinkOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const ADD_TO_FAVOURITES = gql`
  mutation ADD_TO_FAVOURITES($article: ArticleInput!) {
    addToFavourites(article: $article)
  }
`;

const REMOVE_FROM_FAVOURITES = gql`
  mutation REMOVE_FROM_FAVOURITES($url: String!) {
    removeFromFavourites(url: $url)
  }
`;

type Props = { article: Article; isFavourite: boolean };
export const Headline: React.FC<Props> = ({ article, isFavourite }) => {
  const [addToFavMutation] = useMutation(ADD_TO_FAVOURITES);
  const [removeFromFavMutation] = useMutation(REMOVE_FROM_FAVOURITES);

  // Note: we should not use refetchQueries here since as
  // it's always better to update the apollo cache.
  // However, it doesn't matter in this case since if
  // I update the cache the code would like a war crime

  const addToFav = useCallback(() => {
    const source = { ...article.source, __typename: undefined };
    addToFavMutation({
      variables: { article: { ...article, __typename: undefined, source } },
      refetchQueries: [{ query: FAVOURITES }],
    });
  }, [article, addToFavMutation]);

  const removeFromFav = useCallback(() => {
    removeFromFavMutation({
      variables: { url: article.url },
      refetchQueries: [{ query: FAVOURITES }],
    });
  }, [article, removeFromFavMutation]);

  const actions = useMemo(
    () => [
      isFavourite ? (
        <HeartTwoTone twoToneColor="#eb2f96" onClick={removeFromFav} />
      ) : (
        <HeartOutlined onClick={addToFav} />
      ),
      <LinkOutlined onClick={() => window.open(article.url, "_blank")} />,
    ],
    [isFavourite, article],
  );

  return (
    <Card
      cover={<img alt="example" src={article.urlToImage} />}
      style={{ width: "100%", margin: "0.5rem 0" }}
      actions={actions}
    >
      <Card.Meta
        title={<p style={{ textAlign: "center" }}>{article.title}</p>}
        description={article.content}
      />

      <Typography.Text type="secondary">
        {article.publishedAt && (
          <>Published on {new Date(article.publishedAt).toDateString()}</>
        )}

        {article.author && <> by {article.author} </>}
      </Typography.Text>
    </Card>
  );
};
