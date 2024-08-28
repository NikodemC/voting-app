import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { VoterListComponent } from './voter-list/voter-list.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { VoteFormComponent } from './vote-form/vote-form.component';

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

  handleVoterAdded(): void {
    if (this.voteFormComponent) {
      this.voteFormComponent.loadVotersAndCandidates();
    }
  }

  handleCandidateAdded(): void {
    if (this.voteFormComponent) {
      this.voteFormComponent.loadVotersAndCandidates();
    }
  }

  handleVoteSubmitted(): void {
    if (this.voterListComponent && this.candidateListComponent) {
      this.voterListComponent.loadVoters();
      this.candidateListComponent.loadCandidates();
    }
  }
}
