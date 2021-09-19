import { Photo_Like_PostBody, Photo_Like_PostData } from '@api/photo/like';
import {
  Photo_Unlike_DeleteData,
  Photo_Unlike_DeleteQuery,
} from '@api/photo/unlike';
import axios from 'axios';

const api = axios.create({ baseURL: '/api/photo' });

export class PhotoApi {
  static async likePhoto(body: Photo_Like_PostBody) {
    await api.post<Photo_Like_PostData>('/like', body);
  }

  static async unlikePhoto(params: Photo_Unlike_DeleteQuery) {
    await api.delete<Photo_Unlike_DeleteData>('/unlike', {
      params,
    });
  }
}
