# Health Challenge Tracker

## Description

A single-page application built with Angular 14+ for tracking user workouts. Users can add their workout details, view a list of users with their workout details, filter and search the list.

## Features

- Add User with Workout Details
- Display User List
- Search by User Name
- Filter by Workout Type
- Pagination for User List

## Setup

1. Clone the repository.
2. Install dependencies:
    ```sh
    npm install
    ```
3. Serve the application:
    ```sh
    ng serve
    ```
4. Visit `http://localhost:4200` in your browser.

## Project Structure

- `src/app/add-user/`: Component for adding a user.
- `src/app/user-list/`: Component for displaying the user list.
- `src/app/user.service.ts`: Service for managing users and their workouts.
- `src/app/app.config.ts`: Configuration file for application settings.
- `src/app/app.module.ts`: Main application module.
- `src/main.ts`: Main entry point for the application.
- `src/styles.css`: Global styles including Tailwind CSS imports.

## Assumptions

- Initial data is provided with three users.
- Data is stored using `localStorage`.

## Libraries Used

- [Angular Material](https://material.angular.io/)
- [Tailwind CSS](https://tailwindcss.com/)

## Testing

- Unit tests are written for one component and one service with 100% code coverage.
- Run tests:
    ```sh
    ng test
    ```
