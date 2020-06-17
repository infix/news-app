import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Article {
  source: { id: string; name: string };

  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  urlToImage: string;

  @Field((type) => GraphQLISODateTime)
  publishedAt: Date;

  @Field({ nullable: true })
  content: string;
}
