import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./user.schema";
import { Model } from "mongoose";
import { Article } from "../news/article.schema";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }

  async create(userData: Omit<User, "favourites">, password: string) {
    return this.userModel.create({ ...userData, password, favourites: [] });
  }

  async addToFavourites({ _id }: User, article: Article) {
    const user = await this.userModel.findOne({ _id });
    user.favourites.push(article);
    await user.save();
    return user;
  }

  async removeFromFavourites({ _id }: User, url: string) {
    const user = await this.userModel
      .findOne({ _id })
      .populate("favourites")
      .exec();

    user.favourites = user.favourites.filter((article) => article.url != url);
    await user.save();
    return user;
  }
}
