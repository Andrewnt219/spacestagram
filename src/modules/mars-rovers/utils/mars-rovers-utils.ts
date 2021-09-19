import { MarsRoverQuery } from '@mars-rover-api';
import queryString from 'query-string';

export function buildMarsRoverUrl({ rover_name }: MarsRoverQuery) {
  return queryString.stringifyUrl({
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}`,
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
