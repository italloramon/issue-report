import { Injectable } from '@angular/core';
import { Issue } from './issue';
import { issues } from 'src/assets/mock-issues';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private issues: Issue[] = issues;

  constructor() { }

  getPendingIssues(): Issue[] {
    return this.issues.filter(issue => !issue.completed);
  }

  createIssue(issue: Issue) {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  editIssue(issueNumber: number,issue: Issue) {
    const index = this.issues.findIndex(i => i.issueNo === issueNumber);
    if (index !== -1) {
      this.issues[index] = { ...this.issues[index], ...issue };
    }
  }

  completeIssue(issue: Issue) {
    const selectedIssue: Issue = {
      ...issue,
      completed: new Date()
    };
    const index = this.issues.findIndex(i => i === issue);
    this.issues[index] = selectedIssue;
  }

  getSuggestions(title: string): Issue[] {
    if (title.length > 3) {
      return this.issues.filter(issue =>
        issue.title.indexOf(title) !== -1
      );
    }
    return [];
  }
}
