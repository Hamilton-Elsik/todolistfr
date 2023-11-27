import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskInsertDTO } from 'src/app/Models/task-insert-dto';
import { UserInsertDTO } from 'src/app/Models/user-insert-dto';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent {
  addTask: UntypedFormGroup;
  constructor(
    private fb: UntypedFormBuilder,
    private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private _dialogRef: MatDialogRef<AddTaskComponent>
  ) {
    this.addTask = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false, Validators.required],
    });
  }
  saveTask() {
    this.spinner.show();
    const taskInsert: TaskInsertDTO = {
      name: this.addTask.value.name,
      description: this.addTask.value.description,
      completed: this.addTask.value.completed,
    };
    this.taskService.saveTask(taskInsert).subscribe(
      (data) => {
        this.spinner.hide();
        this.toastr.success(data.message);
        this.close();
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
  close() {
    this._dialogRef.close(true);
  }
}
