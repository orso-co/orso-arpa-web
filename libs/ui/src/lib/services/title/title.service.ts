import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private titleChangeSubject = new BehaviorSubject(this.titleSvc.getTitle());
  private titleChange$ = this.titleChangeSubject.asObservable();

  constructor(private titleSvc: Title) {}

  setTitle(title: string) {
    this.titleSvc.setTitle(title);
    this.titleChangeSubject.next(title);
  }

  getTitle(): Observable<string> {
    return this.titleChange$;
  }
}
