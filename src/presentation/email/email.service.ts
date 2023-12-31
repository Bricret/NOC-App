import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';

interface SentMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    //TODO: add attachments:
}


export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    async sendEmail(options: SentMailOptions): Promise<boolean> {

        const { to, subject, htmlBody } = options;
        try {

            const sentInformation = await this.transporter.sendMail({
                to,
                subject,
                html: htmlBody
            });

            console.log( sentInformation );

            return true;
        } catch (error) {
            

            return false;
        }

    }
}


