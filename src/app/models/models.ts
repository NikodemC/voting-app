export interface Voter {
  id: number;
  name: string;
  hasVoted: boolean;
}

export interface Candidate {
  id: number;
  name: string;
  votes: number;
}

export interface VoteRequest {
  voterId: number;
  candidateId: number;
}

export interface VoteResponse {
  voters: Voter[];
  candidates: Candidate[];
}
