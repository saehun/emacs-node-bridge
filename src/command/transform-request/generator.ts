import { HttpRequest } from './lib/types';
import * as QS from 'query-string';

export declare function generateHttpTemplateFetcher(parsed: HttpRequest): string;
export declare function generateParsedRequestRequester(parsed: HttpRequest): string;
export declare function generateParsedRequestFetcher(parsed: HttpRequest): string;

export function generateHttpTemplateRequester(request: HttpRequest) {
  return `
${importTemplate()}

class Requester {
  constructor(private readonly httpTemplate: HttpTemplate) {}

  ${requestTemplate(request)}

  private createUrl(): string {
    return '${request.url}';
  }

  private createOptions(): Partial<HttpTemplateOptions> {
    return {
      headers: ${JSON.stringify(request.headers, null, 2)
        .split('\n')
        .map((line, index) => (index === 0 ? line : '      ' + line))
        .join('\n')}
    }
  }

  ${requestBodyTemplate(request)}
}
`.trim();
}

const importTemplate = () =>
  `
import { HttpTemplate, HttpTemplateOptions, ParameterType } from '@tossteam/t2-http-protocol';
import { Parameter } from '@tossteam/t2-http';
`.trim();

const requestTemplate = (request: HttpRequest) =>
  `
  async request(): Promise<string> {
    return await http.${request.method}(
      this.createUrl(), ${
        request.method === 'get' || request.method === 'head' || request.method === 'delete'
          ? ''
          : '\n      this.createPayload(),'
      }
      this.createOptions(),
    ).text();
  }
`.trim();

function requestBodyTemplate(request: HttpRequest) {
  if (['get', 'head', 'delete'].includes(request.method)) {
    return '';
  }

  const [callMethod, bodyObject] = parseBody();

  return `private createPayload(): ParameterType {
    return new Parameter().addObject(${bodyObject}).${callMethod}()
  }`;

  function parseBody(): [string, string] {
    const contentTypeHeader =
      request.headers['Content-Type'] || request.headers['content-type'] || '';
    if (/urlencoded/.test(contentTypeHeader)) {
      return ['toString', JSON.stringify(QS.parse(request.body))];
    }

    if (/json/.test(contentTypeHeader)) {
      return ['toObject', request.body];
    }

    // unknown content-type
    return ['toObject', '{}'];
  }
}
