import { BASE_URL } from '../configs/api.config';
import { HttpHeaders } from '@angular/common/http';

export abstract class BaseRestService {
  baseUrl: string = BASE_URL;
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor() {}
}
