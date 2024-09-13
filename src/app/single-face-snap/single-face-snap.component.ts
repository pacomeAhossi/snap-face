import { DatePipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaceSnap } from '../models/face-snap';
import { FaceSnapsService } from '../services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  standalone: true,
  imports: [NgStyle, NgClass, UpperCasePipe, DatePipe, RouterLink],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap!: FaceSnap;

  snapButtonText!: string;
  userHasSnaped!: boolean;
  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.prepareInterface();
    this.getFaceSnap();
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

  private prepareInterface() {
    this.snapButtonText = 'Oh snap';
    this.userHasSnaped = false;
  }

  private getFaceSnap() {
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }
}
