# YabbyDev Portfolio

Full-stack portfolio and digital services platform for [yabbydev.com](https://yabbydev.com). It combines a modern public website with a secured backend for managing projects, business templates, academic work, inquiries, and payments.

## Highlights

- Responsive portfolio and services experience
- Project, template, and academic-content management
- Admin dashboard and inquiry tracking
- Payment initialization and transaction handling
- REST API with validation, centralized error handling, and rate limiting
- PostgreSQL persistence and Supabase-backed file storage

## Architecture

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS, TanStack Query, Axios, and Framer Motion
- **Backend:** Java 21, Spring Boot 3, Spring Security, Spring Data JPA, MapStruct, and PostgreSQL
- **Deployment:** Next.js-ready frontend plus a Dockerized Spring Boot service

## Repository structure

- `frontend/` — public website, service pages, demos, and admin interface
- `portfolio-service/` — REST API, business logic, persistence, security, payments, and storage integration

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

Use Java 21 and configure the required database and integration settings for your environment, then run:

```bash
cd portfolio-service
./mvnw spring-boot:run
```

On Windows, use `mvnw.cmd spring-boot:run`.

## Live site

Visit [yabbydev.com](https://yabbydev.com).

## Author

Built by [Abdullahi Zubair](https://github.com/yabdev).
