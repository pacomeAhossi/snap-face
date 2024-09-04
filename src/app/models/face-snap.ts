import { SnapType } from './snap-type.type';

export class FaceSnap {
  location?: string;
  id!: string;
  constructor(
    public title: string,
    public description: string,
    public imageUrl: string,
    public createdAt: Date,
    public snaps: number
  ) {
    this.id = crypto.randomUUID().substring(0, 8);
  }

  snap(snapType: SnapType): void {
    if (snapType === 'snap') {
      this.addSnap();
    } else if (snapType === 'unSnap') {
      this.removeSnap();
    }
  }

  addSnap(): void {
    this.snaps++;
  }

  removeSnap(): void {
    this.snaps--;
  }

  setLocation(location: string): void {
    this.location = location;
  }

  withLocation(location: string): FaceSnap {
    this.setLocation(location);
    return this;
  }
}
