import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUserData(timeSpan: '7days' | '30days' | 'total') {
    return this.http.get<User>('../../assets/mockData/userData.json').pipe(
      map((user) => {
        const newHistory = user.history
          .map((workout) => ({
            ...workout,
            date: new Date(workout.date),
          }))
          .filter((workout) => {
            if (timeSpan === '7days') {
              return (
                workout.date > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              );
            } else if (timeSpan === '30days') {
              return (
                workout.date > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              );
            } else {
              return true;
            }
          });
        return {
          ...user,
          history: newHistory,
        };
      })
    );
  }
}
