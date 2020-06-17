import { Module } from "@nestjs/common";
import { NewsResolver } from "./news.resolver";
import { ConfigModule } from "@nestjs/config";
import { NewsService } from "./news.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Article, ArticleSchema } from "./article.schema";

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Article.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
