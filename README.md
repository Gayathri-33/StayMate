# StayMate — Hostel Management System

I developed StayMate, a full-stack hostel management application using React, Java, Spring Boot, and MySQL. The project includes frontend-to-backend integration and backend functionality for hostel management. I documented the project's architecture, technology stack, and local setup instructions in the GitHub repository. Although the application is not currently deployed publicly, I can demonstrate the code and explain my implementation and technical decisions.

## Features

- **Role-Based Access Control:** Supports role-based access for Super Admins, Admins, and Residents.
- **Authentication and Security:** JWT-based authentication and protected application endpoints.
- **REST API Integration:** Connects frontend components to backend services through REST APIs.
- **Database Management:** Uses MySQL for persistent storage and Hibernate/JPA for database operations.
- **Responsive User Interface:** Provides a web interface for accessing hostel management functionality.
- **Maintainable Architecture:** Separates frontend, backend, and database responsibilities.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React, JavaScript, HTML, CSS |
| Backend | Java 17, Spring Boot |
| Security | Spring Security, JWT |
| Database | MySQL |
| ORM | Spring Data JPA, Hibernate |
| Build Tool | Maven |
| API Testing | Postman |
| Version Control | Git, GitHub |

## Architecture

The application follows a client-server architecture:

1. **Frontend:** React provides the user interface and sends HTTP requests to the backend.
2. **Backend:** Spring Boot handles business logic, request validation, authentication, and REST API operations.
3. **Database:** MySQL stores application data, accessed through JPA/Hibernate.
4. **Security:** JWT-based authentication and role-based authorization protect supported endpoints.

## Getting Started

### Prerequisites

Install the following before running the application:

- Java 17
- Node.js and npm
- MySQL Server
- Maven, or use the project's Maven Wrapper if available
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Gayathri-33/StayMate.git
cd StayMate
```
.

### 2. Configure the database

Create the database in MySQL:

```sql
CREATE DATABASE staymate_db;
```

Configure the database connection in the Spring Boot configuration using your local MySQL username and password.

**Security note:** Do not commit real database passwords, JWT secrets, or API keys to GitHub. Use environment variables or an untracked local configuration file.

### 3. Run the backend

Open a terminal in the backend project directory and run:

```bash
mvn spring-boot:run
```


### 4. Run the frontend

Open another terminal in the frontend project directory:

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite in the terminal.

> Update these commands and directory paths if your repository uses a different frontend/backend structure or configuration.

## Testing

The application can be tested by verifying:

- Authentication and authorization for supported user roles.
- REST API request and response behavior.
- Database operations and data persistence.
- Frontend-to-backend integration.
- Validation and error handling for supported workflows.

Postman can be used to test backend API endpoints.

## Learning Outcomes

Developing StayMate provided practical experience with full-stack application architecture, Java backend development, REST API integration, relational databases, authentication, and frontend/backend communication.

## Project Links

- **GitHub Repository:** https://github.com/Gayathri-33/StayMate.git

## Author

Developed as a software development project to apply full-stack development concepts using Java, Spring Boot, React, and MySQL.
