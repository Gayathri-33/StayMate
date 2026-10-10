# StayMate — Hostel Management System

StayMate is a full-stack hostel management application designed to simplify hostel operations through a centralized web interface. It connects a React frontend with a Java Spring Boot backend and a MySQL database to support hostel management workflows.

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
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd StayMate
```

Replace the URL with your actual repository URL. Use the directory name created by Git if it differs from `StayMate`.

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

If the project uses the Maven Wrapper, use the appropriate wrapper command for your operating system.

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

- **GitHub Repository:** <YOUR_GITHUB_REPOSITORY_URL>
- **Live Demo:** Add a link if the application is publicly deployed.

## Author

Developed as a software development project to apply full-stack development concepts using Java, Spring Boot, React, and MySQL.
