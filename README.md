# iCloset-V2

Say goodbye to chaotic mornings spent trying to figure out what to wear for the day, and say hello to **iCloset**, the ultimate digital closet! Organize your pieces or use the Outfit Maker feature to create and save complete outfits with the click of a button. To get started, just add some details and a picture of your clothing piece!

Version 1: Aug. 22, 2024
    - frontend application only

Version 2: Oct. 3, 2024
    - complete fullstack application (including new features)

## How to Setup and Run

### Frontend Setup:

1. From root, change into client directory:
```sh
cd client
```
2. Run the following command in the terminal to install the dependencies:
```sh
npm install
```
3. Run React:
```sh
npm run dev
```

### Backend Setup:

1. In another terminal, from root, change into server directory:
```sh
cd server
```
2. Install necessary packages and libraries:
```sh
pipenv install
```
3. Set up Python environment and run Flask:
```sh
pipenv shell
flask run
```
4. Finally, visit [http://localhost:5173/](http://localhost:5173/) to try out the app yourself.

## Goals

- **Make fashion a fun and creative part of the daily routine** even in a busy, fast-paced city life.
- **Provide an easy, convenient way to curate and organize** through the overwhelming clutter and the beloved artifacts that we find in our closets.
- **Develop full CRUD capabilities** for at least one resource, with create and read actions for each resource.

## Features

- **Interactive Closet**: Browse through, edit, and discard each clothing item with ease.
- **Outfit Maker**: Users can explore their unique style by mixing and matching their pieces to create and save a new outfit they've never tried wearing before, enhancing the creative interactive experience.
- **Authentication**: Restricted access to ensure that the user's item images and details are kept private with secure login.

## Tech Stack

### Frontend

- **React JS**: for building the user interface.
- **React Router v6**: for navigation between client-side routes.

### Backend

- **Flask**: as the backend framework.
- **SQLite3**: for the database to store user and interaction data.
- **Flask Migrate**: for handling database migrations.

## Database Schema



## Example API Endpoints


