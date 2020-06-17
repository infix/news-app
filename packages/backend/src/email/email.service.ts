import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import sgMail = require("@sendgrid/mail");

@Injectable()
export class EmailService {
  private readonly senderEmail: string;

  constructor(private readonly config: ConfigService) {
    this.senderEmail = this.config.get("SENDER_EMAIL_ADDR");
    sgMail.setApiKey(config.get<string>("SENDGRID_API_KEY"));
  }

  sendMail(to: string, templateId: string, data: { [k: string]: any }) {
    return sgMail.send({
      to,
      from: this.senderEmail,
      templateId,
      dynamicTemplateData: data,
    });
  }
}
