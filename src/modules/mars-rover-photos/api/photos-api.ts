import { Photos_Index_GetData, Photos_Index_GetQuery } from '@api/photos';
import axios from 'axios';

const api = axios.create({ baseURL: '/api/photos' });

export class PhotosApi {
  static async fetchMarsRoverPhotos(params: Photos_Index_GetQuery) {
    const { data } = await api.get<Photos_Index_GetData>('/', {
      params,
    });

    return data;
  }
}
