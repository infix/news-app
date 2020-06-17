import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { EmailService } from "../email/email.service";
import { PasswordGenerationService } from "./passwordGeneration.service";
import { GraphQLError } from "graphql";
import { AuthService } from "./auth.service";
import { AuthResultDTO } from "./dtos/AuthResult.dto";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordGenerationService,
    private readonly emailService: EmailService,
  ) {}

  @Mutation((returns) => String)
  async register(
    @Args("email") email: string,
    @Args("name") name: string,
    @Args("dateOfBirth") dateOfBirth: string,
  ) {
    const password = this.passwordService.generate();
    const userData: any = { email, password, name, dateOfBirth };
    await this.authService.register(userData);
    await this.sendRegistrationEmail(email, password);
    return "Check your email";
  }

  private async sendRegistrationEmail(email: string, password: string) {
    const templateId = "d-774099ca397645f5bce30a9f8fe07811";
    try {
      await this.emailService.sendMail(email, templateId, { password });
    } catch (e) {
      throw new GraphQLError("Something went wrong :(");
    }
  }

  @Mutation((returns) => AuthResultDTO)
  async login(
    @Args("email") email: string,
    @Args("password") password: string,
  ): Promise<AuthResultDTO> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new GraphQLError("Incorrect email or password");
    const token = await this.authService.login(user);
    return { email: user.email, _id: user._id, token };
  }
}
