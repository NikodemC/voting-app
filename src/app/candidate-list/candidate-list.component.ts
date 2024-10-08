import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Candidate } from '../models/models';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../services/candidate.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidate-list.component.html',
  styleUrl: './candidate-list.component.css'
})
export class CandidateListComponent implements OnInit {

  candidates: Candidate[] = [];
  newCandidateName: string = '';

  @Output() candidateAdded = new EventEmitter<Candidate>();

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.loadCandidates();
  }

  addVote(candidateId: number): void {
    const candidate = this.candidates.find(c => c.id === candidateId);
    if (candidate) {
      candidate.votes += 1;
    }
  }

  addCandidate(): void {
    const name = this.newCandidateName.trim();
    if (!name) {
      alert('Please enter a valid name.');
      return;
    }

    this.candidateService.addCandidate(name).subscribe({
      next: (newCandidate) => {
        this.candidates.push(newCandidate);
        this.candidateAdded.emit(newCandidate);
        this.newCandidateName = '';
      },
      error: (err) => console.error('Failed to add candidate', err)
    });
  }

  private loadCandidates(): void {
    this.candidateService.getCandidates().subscribe({
      next: (data) => this.candidates = data,
      error: (err) => console.error('Failed to load candidates', err)
    });
  }
}
