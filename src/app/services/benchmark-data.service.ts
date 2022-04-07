import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Records } from '../models/benchmark.model';

@Injectable({
  providedIn: 'root',
})
export class BenchmarkDataService {
  constructor(private http: HttpClient) {}

  getBenchmarkData(type: string) {
    return this.http.get<Records[]>(`../../assets/mockData/${type}Data.json`);
  }
}
