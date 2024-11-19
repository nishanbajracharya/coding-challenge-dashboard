import { Request } from 'express';

export interface TypedRequestBody<T> extends Request {
  body: T;
}

export type APIError = {
  code?: string | number;
  message: string;
  details?: object[];
};

export type APILink = {
  href: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'OPTIONS' | 'DELETE' | 'HEAD' | 'TRACE';
};

export type APILinks = {
  self: APILink;
  next?: APILink;
  prev?: APILink;
  last?: APILink;
  [action: string]: APILink | undefined;
};

export type APIMetaData = {
  _links?: APILinks;
};

export type APIResponse = {
  _links?: APILinks;
  data?: unknown;
  errors?: APIError[];
};

export type Profile = {
  id: string;
  email: string;
  username?: string;
  fullName?: string;
}