import { MarsRoverPhotosQuery } from '@mars-rover-photos-api';
import queryString from 'query-string';
export function buildMarsRoverPhotosUrl({
  rover_name,
  ...query
}: MarsRoverPhotosQuery) {
  return queryString.stringifyUrl({
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_name}/photos`,
    query: {
      ...query,
      api_key: process.env['NASA_API_KEY'],
    },
  });
}
