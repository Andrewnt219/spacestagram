import { MarsRoverQuery } from '@mars-rover-api';
import { hasValue } from '@utils/validate-utils';
import queryString from 'query-string';

export function buildMarsRoverUrl({ rover_id }: MarsRoverQuery) {
  return queryString.stringifyUrl({
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_id}`,
    query: {
      api_key: process.env['NASA_API_KEY'],
    },
  });
}

export function buildMarsRoversUrl() {
  return queryString.stringifyUrl({
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers`,
    query: {
      api_key: process.env['NASA_API_KEY'],
    },
  });
}

export function isMarsRoverQuery(
  query: Record<string, number | string | string[]>
): query is MarsRoverQuery {
  return hasValue(query.rover_id);
}