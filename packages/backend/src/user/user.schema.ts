import * as mongoose from "mongoose";
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Article } from "../news/article.schema";

@Schema()
export class User extends mongoose.Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop(
    raw([
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Article.name,
      },
    ]),
  )
  favourites: Article[];
}

export const UserSchema = SchemaFactory.createForClass(User);
