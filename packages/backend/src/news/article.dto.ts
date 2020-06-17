import { Field, InputType, ObjectType } from "@nestjs/graphql";

@ObjectType("ArticleSourceOutput")
@InputType("ArticleSourceInput")
export class ArticleSource {
  @Field({ nullable: true })
  id: string;
  @Field({ nullable: true })
  name: string;
}

@InputType("ArticleInput")
@ObjectType("ArticleOutput")
export class ArticleDTO {
  @Field((type) => ArticleSource, { nullable: true })
  source: ArticleSource;

  @Field({ nullable: true })
  author: string;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  url: string;

  @Field({ nullable: true })
  urlToImage: string;

  @Field({ nullable: true })
  publishedAt: string;

  @Field({ nullable: true })
  content: string;
}
