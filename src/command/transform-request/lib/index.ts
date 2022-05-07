import { parseCurlCommand } from './parseCurl';
import { parseHttpReqeust } from './parseHttp';
import { requestWith } from './requestWith';

export const parsedRequest = {
  http: requestWith(parseHttpReqeust),
  curl: requestWith(parseCurlCommand),
} as const;
