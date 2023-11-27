import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/Services/task.service';

@Component({
  selector: 'app-delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.scss'],
})
export class DeleteTaskComponent {
  constructor(
    private _dialogRef: MatDialogRef<DeleteTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private taskService: TaskService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}
  deleteTask() {
    this.spinner.show();
    this.taskService.deleteTask(this.data).subscribe(
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
