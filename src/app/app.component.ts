import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoterListComponent } from './voter-list/voter-list.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { VoteFormComponent } from './vote-form/vote-form.component';
import { Candidate, Voter } from './models/models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, VoterListComponent, CandidateListComponent, VoteFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Voting App';
  @ViewChild(VoteFormComponent) voteFormComponent!: VoteFormComponent;
  @ViewChild(VoterListComponent) voterListComponent!: VoterListComponent;
  @ViewChild(CandidateListComponent) candidateListComponent!: CandidateListComponent;

  handleVoterAdded(voter: Voter): void {
    if (this.voteFormComponent) {
      this.voteFormComponent.addNewVoter(voter);
    }
  }

  handleCandidateAdded(candidate: Candidate): void {
    if (this.voteFormComponent) {
      this.voteFormComponent.addNewCandidate(candidate);
    }
  }

  handleVoteSubmitted(data: { voterId: number, candidateId: number }): void {
    if (this.voterListComponent && this.candidateListComponent) {
      this.voterListComponent.markAsVoted(data.voterId);
      this.candidateListComponent.addVote(data.candidateId);
    }
  }
}
