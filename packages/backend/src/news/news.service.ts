import { Injectable } from "@nestjs/common";
import { default as axios } from "axios";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class NewsService {
  private baseUrl = "http://newsapi.org/v2/top-headlines";
  private readonly apiKey: string;

  constructor(private readonly config: ConfigService) {
    this.apiKey = config.get<string>("NEWS_API_KEY");
  }

  getNews(category: "business" | "sport", country: "eg" | "ae") {
    const url = `${this.baseUrl}?country=${country}&category=${category}&apiKey=${this.apiKey}`;
    return axios.get(url);
  }
}
