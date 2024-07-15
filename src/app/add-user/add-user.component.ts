import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  username: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0; // Initialize with a default value

  constructor(private userService: UserService) {}

  addUser(): void {
    if (this.username && this.workoutType && this.workoutMinutes !== null && this.workoutMinutes !== undefined) {
      const user = {
        id: this.userService.getUsers().length + 1,
        name: this.username,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
      };
      this.userService.addUser(user);
      this.clearForm();
    }
  }

  clearForm(): void {
    this.username = '';
    this.workoutType = '';
    this.workoutMinutes = 0; // Reset to default value
  }
}
