import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from './../services/face-snaps.service';

@Component({
  selector: 'app-face-snap',
  standalone: true,
  imports: [NgStyle, NgClass, UpperCasePipe, DatePipe],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent implements OnInit {
  @Input() faceSnap!: FaceSnap;

  snapButtonText!: string;
  userHasSnaped!: boolean;
  constructor(private faceSnapsService: FaceSnapsService) {}

  ngOnInit() {
    this.snapButtonText = 'Oh snap';
    this.userHasSnaped = false;
  }

  onSnap(): void {
    if (this.userHasSnaped) {
      this.unSnap();
    } else {
      this.snap();
    }
  }

  snap() {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
    this.snapButtonText = 'Oops unsnap!';
    this.userHasSnaped = true;
  }

  unSnap() {
    this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unSnap');
    this.snapButtonText = 'Oh snap!';
    this.userHasSnaped = false;
  }
}
