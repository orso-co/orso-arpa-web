export interface TokenToDecode {
  role: string | string[] | undefined;
  aud: string;
  iss: string;
  exp: number;
  iat: number;
  nameid: string;
  name: string;
  token: string;
  sub: string;
  [personId: string]: unknown;
}
