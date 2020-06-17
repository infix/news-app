import { Args, Query, Resolver } from "@nestjs/graphql";
import { NewsCategory, NewsCountry, NewsService } from "./news.service";
import { ArticleDTO } from "./article.dto";
import { GqlAuthGuard } from "../auth/auth.guard";
import { UseGuards } from "@nestjs/common";

@Resolver("News")
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}

  @Query((returns) => [ArticleDTO])
  @UseGuards(GqlAuthGuard)
  async news(
    @Args("country") country: NewsCountry,
    @Args("category") category: NewsCategory,
  ) {
    return await this.newsService.getNews(category, country);
  }
}
