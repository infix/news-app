import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";
import { GraphQLModule } from "@nestjs/graphql";

import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/news-app"),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
