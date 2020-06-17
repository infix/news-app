import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthResultDTO {
  @Field()
  _id: string;

  @Field()
  email: string;

  @Field()
  token: string;
}
