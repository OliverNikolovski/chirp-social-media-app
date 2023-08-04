import {Injectable} from "@angular/core";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private errorConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snack-bar-error']
  };

  constructor(private matSnackBar: MatSnackBar) {
  }

  error(message: string, label?: string) {
    this.matSnackBar.open(message, label, this.errorConfig);
  }

}
