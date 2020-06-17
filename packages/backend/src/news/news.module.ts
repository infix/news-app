import { Module } from "@nestjs/common";
import { NewsResolver } from "./news.resolver";
import { ConfigModule } from "@nestjs/config";
import { NewsService } from "./news.service";

@Module({
  imports: [ConfigModule],
  providers: [NewsResolver, NewsService],
})
export class NewsModule {}
