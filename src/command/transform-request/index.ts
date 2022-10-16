import assert from 'assert';
import { match } from 'ts-pattern';
import { Emacs } from '../../emacs';
import { Env } from '../type';
import {
  generateHttpTemplateFetcher,
  generateHttpTemplateRequester,
  generateParsedRequestFetcher,
  generateParsedRequestRequester,
} from './generator';
import { parseCurlCommand } from './lib/parseCurl';
import { parseHttpReqeust } from './lib/parseHttp';

export async function transformRequest(templateName: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  const parsed = match(inputType(env.region))
    .with(InputType.curl, () => parseCurlCommand(env.region))
    .with(InputType.http, () => parseHttpReqeust(env.region))
    .exhaustive();

  const generated = match(ensureElementsOf(TemplateCase, templateName))
    .with('http-template-requester', () => generateHttpTemplateRequester(parsed))
    .with('http-template-fetcher', () => generateHttpTemplateFetcher(parsed))
    .with('parsed-request-requester', () => generateParsedRequestRequester(parsed))
    .with('parsed-request-fetcher', () => generateParsedRequestFetcher(parsed))
    .exhaustive();

  return Emacs.progn(Emacs.replaceRegion(generated));
}

transformRequest.command = 'transform-request';

enum InputType {
  curl = 'curl',
  http = 'http',
}

const TemplateCase = [
  'http-template-requester',
  'http-template-fetcher',
  'parsed-request-requester',
  'parsed-request-fetcher',
] as const;

function ensureElementsOf<T extends Readonly<any>>(arr: T, item: string): T[number] {
  if (arr.includes(item)) {
    return item as T[number];
  }
  throw new Error(`${item} in not an element of ${arr}`);
}

function inputType(region: string): InputType {
  if (region.trim().startsWith('curl')) {
    return InputType.curl;
  } else {
    return InputType.http;
  }
}
