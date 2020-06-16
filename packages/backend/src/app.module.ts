import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/news-app")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
