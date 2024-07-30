import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Issue } from '../issue';
import { IssuesService } from '../issues.service';

interface IssueForm {
  title: FormControl<string>;
  description: FormControl<string>;
  priority: FormControl<string>;
}

@Component({
  selector: 'app-issue-edit',
  templateUrl: './issue-edit.component.html',
  styleUrls: ['./issue-edit.component.css']
})
export class IssueEditComponent implements OnInit {
  @Input() issue!: Issue;

  @Output() formClose = new EventEmitter();

  issueForm!: FormGroup<IssueForm>;

  constructor(private issueService: IssuesService) {}

  ngOnInit(): void {
    this.issueForm = new FormGroup<IssueForm>({
      title: new FormControl(this.issue.title, { nonNullable: true, validators: Validators.required }),
      description: new FormControl(this.issue.description, { nonNullable: true, validators: Validators.required }),
      priority: new FormControl(this.issue.priority, { nonNullable: true }),
    });
  }

  editIssue() {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.editIssue(this.issue.issueNo, this.issueForm.getRawValue() as Issue);
    this.formClose.emit();
  }
}
