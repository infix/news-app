import { Injectable } from "@nestjs/common";
import { default as axios } from "axios";
import { ConfigService } from "@nestjs/config";
import { ArticleDTO } from "./article.dto";
import { Article } from "./article.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

export type NewsCategory = "business" | "sports";
export type NewsCountry = "eg" | "ae";

type NewsResponse = {
  data: { status: string; totalResults: number; articles: ArticleDTO[] };
};

@Injectable()
export class NewsService {
  private baseUrl = "http://newsapi.org/v2/top-headlines";
  private readonly apiKey: string;

  constructor(
    private readonly config: ConfigService,
    @InjectModel(Article.name)
    private readonly article: Model<Article>,
  ) {
    this.apiKey = config.get<string>("NEWS_API_KEY");
  }

  async getNews(
    category: NewsCategory,
    country: NewsCountry,
  ): Promise<ArticleDTO[]> {
    const url = `${this.baseUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    const newsResponse = await axios.get<any, NewsResponse>(url);
    return newsResponse.data.articles;
  }

  async create(article: ArticleDTO) {
    return this.article.create(article);
  }
}
