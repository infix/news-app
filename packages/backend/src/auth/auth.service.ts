import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { User } from "../user/user.schema";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { GraphQLError } from "graphql";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) return user;

    return null;
  }

  async login(user: User): Promise<string> {
    // @ts-ignore
    return this.jwtService.sign(user._doc);
  }

  async register(userData: Omit<User, "favourites">): Promise<User> {
    const user = await this.userService.findByEmail(userData.email);
    if (user) throw new GraphQLError("User Already Exists");
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return await this.userService.create(userData, hashedPassword);
  }
}
