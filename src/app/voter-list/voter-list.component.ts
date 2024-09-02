import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Voter } from '../models/models';
import { CommonModule } from '@angular/common';
import { VoterService } from '../services/voter.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-voter-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './voter-list.component.html',
  styleUrl: './voter-list.component.css'
})
export class VoterListComponent implements OnInit {

  voters: Voter[] = [];
  newVoterName: string = '';

  @Output() voterAdded = new EventEmitter<Voter>();

  constructor(private voterService: VoterService) {}

  ngOnInit(): void {
    this.loadVoters();
  }

  markAsVoted(voterId: number): void {
    const voter = this.voters.find(v => v.id === voterId);
    if (voter) {
      voter.hasVoted = true;
    }
  }

  addVoter(): void {
    const name = this.newVoterName.trim();
    if (!name) {
      alert('Please enter a valid name.');
      return;
    }

    this.voterService.addVoter(name).subscribe({
      next: (newVoter) => {
        this.voters.push(newVoter);
        this.voterAdded.emit(newVoter);
        this.newVoterName = '';
      },
      error: (err) => console.error('Failed to add voter', err)
    });
  }

  private loadVoters(): void {
    this.voterService.getVoters().subscribe({
      next: (data) => this.voters = data,
      error: (err) => console.error('Failed to load voters', err)
    });
  }
}
