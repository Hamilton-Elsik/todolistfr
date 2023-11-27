import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskDTO } from 'src/app/Models/task-dto';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent implements OnInit {
  task: TaskDTO;
  constructor(
    private _dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.taskService.getTaskById(this.data).subscribe(
      (data) => {
        this.task = data;
        console.log('task ', this.task);
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error(error?.error?.message, 'Error!');
        this._dialogRef.close(true);
      }
    );
  }
  close() {
    this._dialogRef.close(true);
  }
  completed() {
    this.task.completed = true;
    this.taskService.editTask(this.task).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastr.success(data.message);
        this._dialogRef.close(true);
      },
      (error) => {
        this.toastr.error(error?.error?.message, 'Error!');
      }
    );
    console.log(this.task);
  }
}
