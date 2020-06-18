import { CurrentUser } from "../auth/CurrentUser.decorator";
import { User } from "./user.schema";
import { GqlAuthGuard } from "../auth/auth.guard";
import { Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { ArticleDTO } from "../news/article.dto";
import { UseGuards } from "@nestjs/common";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(returns => [ArticleDTO])
  @UseGuards(GqlAuthGuard)
  async favourites(@CurrentUser() user: User) {
    return await this.userService.getFavourites(user._id);
  }
}
