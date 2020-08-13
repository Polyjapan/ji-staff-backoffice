import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {isNumber} from 'util';
import {CreateTaskTypeComponent} from './create-task-type/create-task-type.component';
import {TaskTypesService} from '../../../services/taskTypes.service';
import {Observable} from 'rxjs';
import {TaskType} from '../../../data/scheduling/taskType';

@Component({
  selector: 'app-select-task-type',
  templateUrl: './select-task-type.component.html',
  styleUrls: ['./select-task-type.component.css']
})
export class SelectTaskTypeComponent implements OnInit {
  @Input() label = 'Type de tache';
  @Input() allowCreation = true;

  @Input() selected: number;
  @Output() selectedChange = new EventEmitter<number>();

  types: Observable<TaskType[]>;

  constructor(private service: TaskTypesService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.types = this.service.getTaskTypes();
  }

  changeValue($event) {
    this.selectedChange.emit($event);
  }

  create() {
    this.dialog.open(CreateTaskTypeComponent).afterClosed().subscribe(res => {
      if (isNumber(res)) {
        this.selected = res;
        this.changeValue(res);
      }
    });
  }
}
