import { Injectable } from "@nestjs/common";

// this could be moved into a separate module
// if it's going to be used elsewhere
@Injectable()
export class PasswordGenerationService {
  generate(): string {
    return Math.random().toString(36).slice(2);
  }
}
