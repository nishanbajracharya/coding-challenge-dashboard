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
};

export type APILinks = {
  self: APILink;
  next?: APILink;
  prev?: APILink;
  last?: APILink;
};

export type APIMetaData = {
  _links?: APILinks;
};

export type APIResponse = {
  _links?: APILinks;
  data?: unknown;
  errors?: APIError[];
};
