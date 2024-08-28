import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../models/models';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  private candidatesUrl = `${environment.apiUrl}/api/candidates`;

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>(this.candidatesUrl);
  }

  addCandidate(name: string): Observable<Candidate> {
    const newCandidate = { name };
    return this.http.post<Candidate>(this.candidatesUrl, newCandidate);
  }
}
