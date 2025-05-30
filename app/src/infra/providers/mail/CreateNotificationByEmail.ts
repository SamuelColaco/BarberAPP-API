
import nodemailer from "nodemailer"
import { IMailProvider } from "../../../domain/interfaces/IMailProvider";
import { env } from "../../../env";

export class CreateNotificationByEmail implements IMailProvider{

    private transporter = nodemailer.createTransport({
        service: env.SMTP_SERVICE,
        auth: {
            user: env.SMTP_USER,
            pass: env.SMTP_PASS
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    async sendEmail(to: string, subject: string, body: string): Promise<void> {

        try {
            await this.transporter.sendMail({
                from: "Barbearia'<no-reply@barbearia.com>'",
                to,
                subject,
                html: body
            })
            
        } catch (error) {
            console.log(error)
        }
    }
}
