import * as mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User extends mongoose.Document {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  favourites: String[];
}

export const UserSchema = SchemaFactory.createForClass(User);
