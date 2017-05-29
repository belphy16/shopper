import { Injectable } from '@angular/core';

@Injectable()
export class ConstantsService {
  apiUrl: string = '/api'
  apiUrlPost: string = 'http://localhost:5000/api'

  constructor() { }

}
