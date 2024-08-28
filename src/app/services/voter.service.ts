import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voter } from '../models/models';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  private votersUrl = `${environment.apiUrl}/api/voters`;

  constructor(private http: HttpClient) { }

  getVoters(): Observable<Voter[]> {
    return this.http.get<Voter[]>(this.votersUrl);
  }

  addVoter(name: string): Observable<Voter> {
    const newVoter = { name };
    return this.http.post<Voter>(this.votersUrl, newVoter);
  }
}
