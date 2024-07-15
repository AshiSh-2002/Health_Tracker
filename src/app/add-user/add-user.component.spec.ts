import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  username: string = '';  // Corrected property name
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private userService: UserService) {}

  addUser(): void {
    if (this.username && this.workoutType && this.workoutMinutes) {
      const user = {
        id: this.userService.getUsers().length + 1, // Generate new ID
        name: this.username,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
      };
      this.userService.addUser(user);
      this.clearForm();
    }
  }

  private clearForm(): void {
    this.username = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}
