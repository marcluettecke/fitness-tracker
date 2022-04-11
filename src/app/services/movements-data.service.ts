import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovementsDataService {
  constructor(private http: HttpClient) {}

  getMovementData() {
    return this.http.get<{ name: string }[]>(
      '../../assets/mockData/movements.json'
    );
  }
}
