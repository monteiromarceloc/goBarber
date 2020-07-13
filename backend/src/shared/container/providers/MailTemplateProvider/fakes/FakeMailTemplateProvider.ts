import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProviders from "../models/IMailTemplateProvider";

export default class FakeMailTemplateProvider implements IMailTemplateProviders {
  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
