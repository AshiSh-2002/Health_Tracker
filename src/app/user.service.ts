import { Injectable } from '@angular/core';

export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }, { type: 'Cycling', minutes: 45 }] },
    { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }, { type: 'Running', minutes: 20 }] },
    { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Yoga', minutes: 50 }, { type: 'Cycling', minutes: 40 }] }
  ];

  constructor() {
    // Retrieve users from localStorage if available
    const storedUsers = localStorage.getItem('userData');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }
  }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User) {
    this.users.push(user);
    this.saveToLocalStorage();
  }

  addUserWorkout(userName: string, workoutType: string, minutes: number) {
    const user = this.users.find(u => u.name === userName);
    if (user) {
      user.workouts.push({ type: workoutType, minutes });
      this.saveToLocalStorage();
    }
  }

  getUserByName(userName: string): User | undefined {
    return this.users.find(u => u.name === userName);
  }

  private saveToLocalStorage() {
    localStorage.setItem('userData', JSON.stringify(this.users));
  }
}
