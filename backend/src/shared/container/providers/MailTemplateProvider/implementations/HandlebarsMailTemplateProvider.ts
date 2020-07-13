import handlebars from "handlebars";

import IParseMailTemplateDTO from "../dtos/IParseMailTemplateDTO";
import IMailTemplateProviders from "../models/IMailTemplateProvider";

export default class HandlebarMailTemplateProvider implements IMailTemplateProviders {
  public async parse({ template, variables }: IParseMailTemplateDTO): Promise<string> {
    const parseCompile = handlebars.compile(template);
    return parseCompile(variables)
  }
}
