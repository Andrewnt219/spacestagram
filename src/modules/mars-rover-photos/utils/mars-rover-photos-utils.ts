import { MarsRoverPhotosQuery } from '@mars-rover-photos-api';
import { hasValue } from '@utils/validate-utils';
import queryString from 'query-string';
export function buildMarsRoverPhotosUrl({
  rover_id,
  ...query
}: MarsRoverPhotosQuery) {
  return queryString.stringifyUrl({
    url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover_id}/photos`,
    query: {
      ...query,
      api_key: process.env['NASA_API_KEY'],
    },
  });
}

export function isMarsRoverPhotosQuery(
  query: Record<string, number | string | string[]>
): query is MarsRoverPhotosQuery {
  return hasValue(query.rover_id);
}
