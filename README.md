# Todo List FrontEnd

## Introduction

This repository contains all the react code of the project.
You can watch a video demonstration of the application here: [Video Link](https://youtu.be/5ejrRWrmp8w).

## Technology Stack

- **ReactJS**: Famous Javascript librarie.


## Features

- **CRUD Operations**:
- **Task Management**: 
- **Database Fetching**: 

## How I Did It 

I started by looking at the code and how the project was started. I first fixed a small bug where an intern forgot to add the key prop in the map of tasks ( 🤫 ). Then i implemented the different features starting with deleting a task, then editing a task, and making sure the small "Save" button only appears when the content is different. To do this, I initialized a state to capture all modified tasks, and then compared the modified task with the original task to check if I could make changes. I also took the time to update the API to add extra security to prevent anyone from bypassing the client. Finally, I decided to create a TaskCard component to organize my app better and make it look cleaner.


## Setup and Installation

### Steps

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd <repository>

2. **Install dependencies**

   ```bash
   yarn install

3. **Run the app**

  ```bash
  yarn run dev
  ```


