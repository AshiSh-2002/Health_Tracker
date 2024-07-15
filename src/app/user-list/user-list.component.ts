import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  searchTerm: string = '';
  workoutTypeFilter: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.users = this.userService.getUsers();
    this.updatePagination();
  }

  search() {
    this.currentPage = 1;
    this.updatePagination();
  }

  filterByWorkoutType() {
    this.currentPage = 1;
    this.updatePagination();
  }

  updatePagination() {
    const filteredUsers = this.users
      .filter(user => 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        user.workouts.some(workout => workout.type.toLowerCase().includes(this.workoutTypeFilter.toLowerCase()))
      );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.hasNextPage()) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  hasNextPage(): boolean {
    const filteredUsers = this.users
      .filter(user => 
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
        user.workouts.some(workout => workout.type.toLowerCase().includes(this.workoutTypeFilter.toLowerCase()))
      );
    const startIndex = this.currentPage * this.itemsPerPage;
    return startIndex < filteredUsers.length;
  }
}
