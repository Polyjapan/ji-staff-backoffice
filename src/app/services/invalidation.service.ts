import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
}) /* this sounds ugly */
export class InvalidationService {
  private observables: Map<string, ((tag: string) => void)[]> = new Map();

  public listen(tag: string, listener: (tag: string) => void): SubscribedListener {
    if (!this.observables.has(tag)) {
      this.observables.set(tag, []);
    }

    this.observables.get(tag).push(listener);

    return {
      cancel() {
        if (this.observables.has(tag)) {
          this.observables.get(tag).splice(this.observables.get(tag).indexOf(listener));
        }
      }
    };
  }

  public invalidate(tag: string) {
    if (this.observables.has(tag)) {
      for (const obs of this.observables.get(tag)) {
        obs(tag);
      }
    }
  }
}

export interface SubscribedListener {
  cancel();
}
