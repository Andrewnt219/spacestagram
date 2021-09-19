import {
  Photo_ToggleLike_GetData,
  Photo_ToggleLike_GetQuery,
} from '@api/photo/toggleLike';
import axios from 'axios';

const api = axios.create({ baseURL: '/api/photo' });

export class PhotoApi {
  static async toggleLike(params: Photo_ToggleLike_GetQuery) {
    await api.get<Photo_ToggleLike_GetData>('/toggleLike', {
      params,
    });
  }
}
