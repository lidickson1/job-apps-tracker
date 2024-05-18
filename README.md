# Job Applications Tracker

A full stack application built to track the progress on my job applications. Built with [Angular](https://angular.io/) and Typescript for the frontend, Java and [Spring Boot](https://spring.io/projects/spring-boot) for the backend. The backend also connects to an [Oracle SQL database](https://www.oracle.com/ca-en/database/technologies/oracle-database-software-downloads.html).

![](https://github.com/lidickson1/job-apps-tracker/blob/master/screenshot.png?raw=true)

## Frontend

Make sure you have the Angular CLI installed:

```
npm install -g @angular/cli
```

To start the dev server:

```
cd frontend
npm install
ng serve
```

## Backend

Open the `backend` folder as a Gradle project. You will need to specify the database connection details in the application properties. By default, the `dev` profile is used (see [here](https://docs.spring.io/spring-boot/reference/features/profiles.html) to learn about Spring Boot profiles).
