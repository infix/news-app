import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { EmailService } from "../email/email.service";
import { PasswordGenerationService } from "./passwordGeneration.service";
import { GraphQLError } from "graphql";
import { AuthService } from "./auth.service";

@Resolver("Auth")
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly passwordService: PasswordGenerationService,
    private readonly emailService: EmailService,
  ) {}

  @Mutation((returns) => String)
  async register(@Args("email") email: string) {
    const password = this.passwordService.generate();
    await this.authService.register(email, password);
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
}