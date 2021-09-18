import { Photos_Index_GetData, Photos_Index_GetQuery } from '@api/photos';
import axios from 'axios';

const api = axios.create({ baseURL: '/api/photos' });

export class MarsRoverPhotosApi {
  static getAllRoverPhotos(params: Photos_Index_GetQuery) {
    return api.get<Photos_Index_GetData>('/', { params });
  }
}
