import { Injectable } from '@angular/core';
import {VoteRequest } from '../models/models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private submitVoteUrl = `${environment.apiUrl}/api/vote/submit`;

  constructor(private http: HttpClient) {}

  submitVote(voterId: number, candidateId: number): Observable<void> {
    const request: VoteRequest = { voterId, candidateId };
    return this.http.post<void>(this.submitVoteUrl, request);
  }
}
