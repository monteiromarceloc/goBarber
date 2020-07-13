import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import { injectable, inject } from 'tsyringe';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
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

  public async sendMail({ from, to, subject, templateData }: ISendMailDTO): Promise<void> {
    const msg = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject: 'Recuperação de senha',
      html: await this.mailTemplateProvider.parse(templateData)
    })
    console.log('id: ', msg.messageId)
    console.log('url: ', nodemailer.getTestMessageUrl(msg))
  }

}
