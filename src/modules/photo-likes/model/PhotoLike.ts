/** Represent a liked photo in the database */
export type PhotoLike = {
  /** The auto generated id */
  _id: string;
  photo_id: string;
  user_id: string;
  /** The created time */
  _timestamp: string;
};
