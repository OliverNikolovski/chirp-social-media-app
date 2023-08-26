import {Injectable} from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition
} from "@angular/material/snack-bar";

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

  private successConfig: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['snack-bar-success']
  }

  constructor(private matSnackBar: MatSnackBar) {
  }

  error(message: string,
        horizontalPosition?: MatSnackBarHorizontalPosition,
        verticalPosition?: MatSnackBarVerticalPosition,
        label?: string) {
    const config = this.withPosition(this.errorConfig, horizontalPosition, verticalPosition);
    this.matSnackBar.open(message, label, config);
  }

  success(message: string,
          horizontalPosition?: MatSnackBarHorizontalPosition,
          verticalPosition?: MatSnackBarVerticalPosition,
          label?: string) {
    const config = this.withPosition(this.successConfig, horizontalPosition, verticalPosition);
    this.matSnackBar.open(message, label, config);
  }

  private withPosition(config: MatSnackBarConfig,
                       horizontalPosition?: MatSnackBarHorizontalPosition,
                       verticalPosition?: MatSnackBarVerticalPosition): MatSnackBarConfig {
    const _config = {...config};
    if (horizontalPosition)
      _config.horizontalPosition = horizontalPosition;
    if (verticalPosition)
      _config.verticalPosition = verticalPosition;

    return _config;
  }

}
