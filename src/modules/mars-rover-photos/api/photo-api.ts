import { Photo_Like_GetData, Photo_Like_GetQuery } from '@api/photo/like';
import { Photo_Unlike_GetData, Photo_Unlike_GetQuery } from '@api/photo/unlike';
import axios from 'axios';

const api = axios.create({ baseURL: '/api/photo' });

export class PhotoApi {
  static async likePhoto(params: Photo_Like_GetQuery) {
    await api.get<Photo_Like_GetData>('/like', {
      params,
    });
  }

  static async unlikePhoto(params: Photo_Unlike_GetQuery) {
    await api.get<Photo_Unlike_GetData>('/unlike', {
      params,
    });
  }
}
