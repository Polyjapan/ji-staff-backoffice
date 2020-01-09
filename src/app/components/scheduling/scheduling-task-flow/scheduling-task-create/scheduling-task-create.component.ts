import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CreateUpdateTask, SchedulingTask} from '../../../../data/scheduling/schedulingTask';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatStep, MatStepper} from '@angular/material';
import {SchedulingService} from '../../../../services/scheduling.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-scheduling-task-create',
  templateUrl: './scheduling-task-create.component.html',
  styleUrls: ['./scheduling-task-create.component.css']
})
export class SchedulingTaskCreateComponent implements OnInit {
  @Input('task') task: SchedulingTask;
  @Input('stepper') stepper: MatStepper;
  @Input('step') step: MatStep;

  dirty: boolean = false;
  sending: boolean = false;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('auto', {static: false}) matAutocomplete: MatAutocomplete;
  @ViewChild('capInput', {static: false}) capInput: ElementRef<HTMLInputElement>;

  capCtrl = new FormControl();
  availableCapabilities: string[];
  filteredCapabilities: Observable<string[]>;
  addDifficulties: string[] = [];
  removeDifficulties: string[] = [];

  constructor(private backend: SchedulingService) {
  }

  get isNew() {
    return !this.task || this.task.id === undefined;
  }

  get taskAsUpdate(): CreateUpdateTask {
    const self = this;
    return {
      name: self.task.name,
      minAge: self.task.minAge,
      minExperience: self.task.minExperience,
      addDifficulties: self.addDifficulties,
      removeDifficulties: self.removeDifficulties,
      difficulties: [] // todo
    };
  }

  ngOnInit() {
    this.updateCompleted();
    this.backend.getCapabilities().pipe(map(cap => cap.map(c => c.cap))).subscribe(cap => this.availableCapabilities = cap);

    this.filteredCapabilities = this.capCtrl.valueChanges.pipe(
      startWith(null),
      map((cap: string | null) => cap ? this._filter(cap) : this.unusedCapabilities.slice()));
  }

  get unusedCapabilities() {
    return this.availableCapabilities.filter(v => this.task.difficulties.indexOf(v) === -1);
  }

  onEdit() {
    if (this.dirty) {
      return;
    }
    this.dirty = true;
    this.updateCompleted();
  }

  send() {
    if (this.sending) {
      return;
    }

    if (this.step.completed) {
      this.stepper.next();
      return;
    }

    this.sending = true;
    try {
      if (this.isNew) {
        this.backend
          .createTask(this.task.projectId, this.taskAsUpdate)
          .subscribe(targetId => {
            this.task.id = targetId;
            this.dirty = false;
            this.sending = false;
            this.updateCompleted();
            this.stepper.next();
          });
      } else {
        this.backend.updateTask(this.task.projectId, this.task.id, this.taskAsUpdate)
          .subscribe(u => {
            this.dirty = false;
            this.sending = false;
            this.updateCompleted();
            this.stepper.next();
          });
      }
    } catch (e) {
      e.print();
      console.log(e);
      this.sending = false;
    }
  }

  remove(cap: string) {
    if (this.addDifficulties.indexOf(cap.trim()) !== -1) {
      this.addDifficulties.splice(this.addDifficulties.indexOf(cap.trim()), 1);
    }
    if (this.task.difficulties.indexOf(cap.trim()) !== -1) {
      this.task.difficulties.splice(this.task.difficulties.indexOf(cap.trim()), 1);
    }
    this.removeDifficulties.push(cap);
    this.onEdit();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.task.difficulties.push(event.option.viewValue);
    this.addDifficulties.push(event.option.viewValue);
    this.capInput.nativeElement.value = '';
    this.capCtrl.setValue(null);

    if (this.removeDifficulties.indexOf(event.option.viewValue.trim()) !== -1) {
      this.removeDifficulties.splice(this.removeDifficulties.indexOf(event.option.viewValue.trim()), 1);
    }

    this.onEdit();
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      if ((value || '').trim()) {
        this.task.difficulties.push(value.trim());
        this.addDifficulties.push(value.trim());
        if (this.removeDifficulties.indexOf(value.trim()) !== -1) {
          this.removeDifficulties.splice(this.removeDifficulties.indexOf(value.trim()), 1);
        }
      }

      // Reset the input value
      if (input) {
        input.value = '';
      }

      this.capCtrl.setValue(null);
      this.onEdit();
    }
  }

  private updateCompleted() {
    if (this.isNew || this.dirty) {
      this.step.completed = false;
    } else {
      this.step.completed = true;
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.unusedCapabilities.filter(cap => cap.toLowerCase().indexOf(filterValue) === 0);
  }
}
