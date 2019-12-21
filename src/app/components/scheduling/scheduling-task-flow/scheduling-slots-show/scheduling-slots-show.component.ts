import {Component, Input, OnInit} from '@angular/core';
import {SchedulingService} from '../../../../services/scheduling.service';
import {TaskSlot} from '../../../../data/scheduling/taskSlot';
import {displayPeriod, Period} from '../../../../data/scheduling/period';

@Component({
  selector: 'app-scheduling-slots-show',
  templateUrl: './scheduling-slots-show.component.html',
  styleUrls: ['./scheduling-slots-show.component.css']
})
export class SchedulingSlotsShowComponent implements OnInit {
  @Input('task') task: number;
  @Input('project') project: number;
  slots: TaskSlot[];

  constructor(private backend: SchedulingService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.backend.getTaskSlots(this.project, this.task)
      .subscribe(slots => this.slots = slots);
  }

  regen() {
    this.slots = undefined;

    this.backend.generateTaskSlots(this.project, this.task)
      .subscribe(_ => this.reload());
  }

  displayPeriod(timeSlot: Period) {
    return displayPeriod(timeSlot);
  }
}
