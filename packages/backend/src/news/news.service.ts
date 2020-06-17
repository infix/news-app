import { Injectable } from "@nestjs/common";
import { default as axios } from "axios";
import { ConfigService } from "@nestjs/config";
import { Article } from "./article.dto";

export type NewsCategory = "business" | "sports";
export type NewsCountry = "eg" | "ae";

type NewsResponse = {
  data: { status: string; totalResults: number; articles: Article[] };
};

@Injectable()
export class NewsService {
  private baseUrl = "http://newsapi.org/v2/top-headlines";
  private readonly apiKey: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = config.get<string>("NEWS_API_KEY");
  }

  async getNews(
    category: NewsCategory,
    country: NewsCountry,
  ): Promise<Article[]> {
    const url = `${this.baseUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    const newsResponse = await axios.get<any, NewsResponse>(url);
    return newsResponse.data.articles;
  }
}
