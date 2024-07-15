import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a user workout', () => {
    service.addUserWorkout('John Doe', 'Running', 30);
    const users = service.getUsers();
    expect(users.length).toBe(1);
    expect(users[0].name).toBe('John Doe');
    expect(users[0].workouts.length).toBe(1);
    expect(users[0].workouts[0].type).toBe('Running');
    expect(users[0].workouts[0].minutes).toBe(30);
  });
});
