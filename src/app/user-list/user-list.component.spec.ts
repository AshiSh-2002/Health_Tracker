import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list.component';
import { UserService, User } from '../user.service';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [FormsModule],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users correctly', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] }
    ];
    spyOn(userService, 'getUsers').and.returnValue(users);
    component.ngOnInit();
    expect(component.users).toEqual(users);
    expect(component.paginatedUsers).toEqual(users.slice(0, component.itemsPerPage));
  });

  it('should filter users by name', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] }
    ];
    spyOn(userService, 'getUsers').and.returnValue(users);
    component.ngOnInit();
    
    component.searchTerm = 'John';
    component.search();
    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });

  it('should filter users by workout type', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] }
    ];
    spyOn(userService, 'getUsers').and.returnValue(users);
    component.ngOnInit();
    
    component.workoutTypeFilter = 'Running';
    component.filterByWorkoutType();
    expect(component.paginatedUsers.length).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });

  it('should update pagination correctly', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] },
      { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Cycling', minutes: 45 }] },
      { id: 4, name: 'Anna Brown', workouts: [{ type: 'Yoga', minutes: 60 }] },
      { id: 5, name: 'Chris Lee', workouts: [{ type: 'Weightlifting', minutes: 45 }] }
    ];
    spyOn(userService, 'getUsers').and.returnValue(users);
    component.ngOnInit();
    
    expect(component.paginatedUsers.length).toBe(component.itemsPerPage);

    component.currentPage = 1;
    component.itemsPerPage = 2;
    component.updatePagination();
    expect(component.paginatedUsers.length).toBe(2);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
    expect(component.paginatedUsers[1].name).toBe('Jane Smith');

    component.currentPage = 2;
    component.updatePagination();
    expect(component.paginatedUsers.length).toBe(2);
    expect(component.paginatedUsers[0].name).toBe('Mike Johnson');
    expect(component.paginatedUsers[1].name).toBe('Anna Brown');
  });

  it('should handle next and previous page buttons correctly', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] },
      { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Cycling', minutes: 45 }] },
      { id: 4, name: 'Anna Brown', workouts: [{ type: 'Yoga', minutes: 60 }] },
      { id: 5, name: 'Chris Lee', workouts: [{ type: 'Weightlifting', minutes: 45 }] }
    ];
    spyOn(userService, 'getUsers').and.returnValue(users);
    component.ngOnInit();

    component.itemsPerPage = 2;
    component.updatePagination();
    
    component.nextPage();
    expect(component.currentPage).toBe(2);
    expect(component.paginatedUsers[0].name).toBe('Mike Johnson');

    component.prevPage();
    expect(component.currentPage).toBe(1);
    expect(component.paginatedUsers[0].name).toBe('John Doe');
  });

  it('should disable next button on the last page', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', workouts: [{ type: 'Running', minutes: 30 }] },
      { id: 2, name: 'Jane Smith', workouts: [{ type: 'Swimming', minutes: 60 }] },
      { id: 3, name: 'Mike Johnson', workouts: [{ type: 'Cycling', minutes: 45 }] }
    ];
    spyOn(userService, 'getUsers').and.returnValue(users);
    component.ngOnInit();
    
    component.itemsPerPage = 2;
    component.updatePagination();
    component.nextPage();
    
    expect(component.hasNextPage()).toBe(false);
  });

  it('should disable previous button on the first page', () => {
    expect(component.currentPage).toBe(1);
    expect(component.currentPage === 1).toBeTrue();
  });
});
