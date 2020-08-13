import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import {TaskType} from '../../../../data/scheduling/taskType';
import {TaskTypesService} from '../../../../services/taskTypes.service';

@Component({
  selector: 'app-create-task-type',
  templateUrl: './create-task-type.component.html',
  styleUrls: ['./create-task-type.component.css']
})
export class CreateTaskTypeComponent implements OnInit {
  taskType: TaskType;
  sending = false;

  constructor(private dialogRef: MatDialogRef<CreateTaskTypeComponent>,
              private tts: TaskTypesService) {
    this.taskType = new TaskType();
  }

  ngOnInit() {
  }

  submit($event: any) {
    if (this.sending) {
      return;
    }
    this.sending = true;

    this.tts.createTaskType(this.taskType.type).subscribe(res => {
      this.dialogRef.close(res);
    }, err => {
      this.sending = false;
      Swal.fire('Il y a eu un problème', undefined, 'error');
    });
  }

}
