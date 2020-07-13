import IMailTemplateProviders from "../models/IMailTemplateProvider";

export default class FakeMailTemplateProvider implements IMailTemplateProviders {
  public async parse(): Promise<string> {
    return 'Mail Content';
  }
}
