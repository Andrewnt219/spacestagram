import { Rover_Index_GetData, Rover_Index_GetQuery } from '@api/rover';
import { Rovers_Index_GetData } from '@api/rovers';
import axios from 'axios';

const roversApi = axios.create({ baseURL: '/api/rovers' });
const roverApi = axios.create({ baseURL: '/api/rover' });

export class MarsRoversApi {
  static async getAllRovers() {
    return roversApi.get<Rovers_Index_GetData>('/');
  }

  static async getRoverById(params: Rover_Index_GetQuery) {
    return roverApi.get<Rover_Index_GetData>('/', { params });
  }
}
