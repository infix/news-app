import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { NewsCategory, NewsCountry, NewsService } from "./news.service";
import { ArticleDTO } from "./article.dto";
import { GqlAuthGuard } from "../auth/auth.guard";
import { UseGuards } from "@nestjs/common";
import { CurrentUser } from "../auth/CurrentUser.decorator";
import { User } from "../user/user.schema";
import { UserService } from "../user/user.service";

@Resolver("News")
export class NewsResolver {
  constructor(
    private readonly newsService: NewsService,
    private readonly userService: UserService,
  ) {}

  @Query((returns) => [ArticleDTO])
  @UseGuards(GqlAuthGuard)
  async news(
    @Args("country") country: NewsCountry,
    @Args("category") category: NewsCategory,
  ) {
    return await this.newsService.getNews(category, country);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async addToFavourites(
    @CurrentUser() user: User,
    @Args({ name: "article", type: () => ArticleDTO })
    articleDTO: ArticleDTO,
  ) {
    const article = await this.newsService.create(articleDTO);
    await this.userService.addToFavourites(user, article);
    return "Added";
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async removeFromFavourites(
    @CurrentUser() user: User,
    @Args("url") url: string,
  ) {
    await this.userService.removeFromFavourites(user, url);
    return "removed";
  }
}
