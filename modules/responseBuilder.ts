import { APIError, APIMetaData, APIResponse } from '../types';

export function buildResponse(
  errors: APIError[] | null,
  data?: unknown,
  meta?: APIMetaData
): APIResponse {
  const response: APIResponse = {};

  if (errors) {
    response.errors = errors;

    return response;
  }

  response.data = data;

  if (meta && meta._links) {
    response._links = meta._links;
  }

  return response;
}
