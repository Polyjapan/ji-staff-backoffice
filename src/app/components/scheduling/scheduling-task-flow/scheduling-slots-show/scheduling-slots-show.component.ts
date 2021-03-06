import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SchedulingService} from '../../../../services/scheduling.service';
import {TaskSlot} from '../../../../data/scheduling/taskSlot';
import {displayPeriod, Period} from '../../../../data/scheduling/period';

@Component({
  selector: 'app-scheduling-slots-show',
  templateUrl: './scheduling-slots-show.component.html',
  styleUrls: ['./scheduling-slots-show.component.css']
})
export class SchedulingSlotsShowComponent implements OnInit, OnChanges {
  @Input('task') task: number;
  @Input('project') project: number;
  slots: TaskSlot[];

  constructor(private backend: SchedulingService) { }

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.slots = undefined;
    this.backend.getTaskSlots(this.project, this.task)
      .subscribe(slots => this.slots = slots);
  }

  displayPeriod(timeSlot: Period) {
    return displayPeriod(timeSlot);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.task || changes.project) {
      this.reload();
    }
  }
}
