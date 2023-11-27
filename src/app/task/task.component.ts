import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TaskService } from '../Services/task.service';
import { TaskDTO } from '../Models/task-dto';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddTaskComponent } from './add-task/add-task.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'completed', 'option'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private taskService: TaskService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.taskService.getTasks().subscribe(
      (data) => {
        this.dataSource = new MatTableDataSource<TaskDTO>(data);
        console.log('data ', data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error(error?.error?.message, 'Error!');
        this.router.navigate(['/']);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  addTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '92vh';
    dialogConfig.maxWidth = '92vw';

    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(AddTaskComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((x) => {
      setTimeout(() => {
        this.getData();
      }, 500);
    });
  }

  deleteTask(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '92vh';
    dialogConfig.maxWidth = '92vw';

    dialogConfig.disableClose = true;
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(DeleteTaskComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((x) => {
      setTimeout(() => {
        this.getData();
      }, 500);
    });
  }

  editTask(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.maxHeight = '92vh';
    dialogConfig.maxWidth = '92vw';

    dialogConfig.disableClose = true;
    dialogConfig.data = id;
    const dialogRef = this.dialog.open(EditTaskComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((x) => {
      setTimeout(() => {
        this.getData();
      }, 500);
    });
  }
}
