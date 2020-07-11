import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from "../models/IMailProvider";

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(testAccount => {
      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      this.client = transporter;
    })
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const msg = await this.client.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com',
      to,
      subject: 'Recuperação de senha',
      text: body
    })
    console.log('id: ', msg.messageId)
    console.log('url: ', nodemailer.getTestMessageUrl(msg))
  }

}
