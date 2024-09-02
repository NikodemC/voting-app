import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Voter, Candidate } from '../models/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../services/candidate.service';
import { VoterService } from '../services/voter.service';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-vote-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vote-form.component.html',
  styleUrl: './vote-form.component.css'
})
export class VoteFormComponent implements OnInit {
  voters: Voter[] = [];
  candidates: Candidate[] = [];
  selectedVoter: Voter | undefined;
  selectedCandidate: Candidate | undefined;

  @Output() voteSubmitted = new EventEmitter<{ voterId: number, candidateId: number }>();

  constructor(
    private voterService: VoterService,
    private candidateService: CandidateService,
    private voteService: VoteService
  ) { }

  ngOnInit(): void {
    this.loadVoters();
    this.loadCandidates();
  }

  addNewVoter(voter: Voter): void {
    this.voters.push(voter);
  }

  addNewCandidate(candidate: Candidate): void {
    this.candidates.push(candidate);
  }

  submitVote(): void {
    if (this.isVoteValid()) {
      this.voteService.submitVote(this.selectedVoter!.id, this.selectedCandidate!.id).subscribe({
        next: () => {
          this.voteSubmitted.emit({
            voterId: this.selectedVoter!.id,
            candidateId: this.selectedCandidate!.id
          });
          this.resetForm();
          alert('Vote submitted successfully!');
        },
        error: (err) => console.error('Failed to submit vote', err)
      });
    } else {
      alert('Please select a voter and a candidate, and ensure the voter has not already voted!');
    }
  }

  private loadVoters(): void {
    this.voterService.getVoters().subscribe({
      next: (data) => this.voters = data,
      error: (err) => console.error('Failed to load voters', err)
    });
  }

  private loadCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (data) => this.candidates = data,
      error: (err) => console.error('Failed to load candidates', err)
    });
  }

  private isVoteValid(): boolean {
    return !!(this.selectedVoter && this.selectedCandidate && !this.selectedVoter.hasVoted);
  }

  private resetForm(): void {
    this.selectedVoter = undefined;
    this.selectedCandidate = undefined;
  }
}
