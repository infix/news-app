import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { ArticleSource } from "./article.dto";

@Schema()
export class Article extends mongoose.Document {
  @Prop(raw({ id: String, name: String }))
  source: ArticleSource;

  @Prop({ type: String })
  author: string;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  url: string;

  @Prop({ type: String })
  urlToImage: string;

  @Prop({ type: String })
  publishedAt: string;

  @Prop({ type: String })
  content: string;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
