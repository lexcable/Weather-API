# Weather-API

A decoupled weather application featuring a **Next.js** frontend and a **Laravel** API backend.

---

## Technologies Used

- **Backend:** Laravel 12, PHP 8.2, HTTP Client, PHPUnit
- **Frontend:** React, Next.js, Vite, TailwindCSS, Axios, RippleUI
- **Database:** MySQL (via Docker)
- **Containerization:** Docker, Docker Compose
- **Other Tools:** Composer, ESLint, Laravel Sail (optional)

---

## Features

- Fetch current weather data by city name using OpenWeatherMap API.
- Clean and responsive UI built with React and TailwindCSS.
- Decoupled architecture with separate frontend and backend.
- Dockerized backend and database for easy setup.
- Basic test coverage for backend routes.

---

## Installation

### Prerequisites

- PHP 8.2 and Composer
- Node.js and npm
- Docker and Docker Compose (optional, for containerized setup)
- OpenWeatherMap API key (sign up at [https://openweathermap.org/api](https://openweathermap.org/api))

### Clone the repository

```bash
git clone <repository-url>
cd weather-api
```

---

## Environment Variables

Create a `.env` file in the root directory (or copy from `.env.example`) and set the following variables:

### Backend

- `OPENWEATHER_API_KEY` - Your OpenWeatherMap API key.

### Frontend

- `NEXT_PUBLIC_WEATHER_API_URL` - The base URL of the backend API (e.g., `http://localhost:8000`).

---

## Running the Application

### Backend (Laravel)

Install PHP dependencies:

```bash
composer install
```

Run database migrations (if applicable):

```bash
php artisan migrate
```

Start the Laravel development server:

```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`.

---

### Frontend (Next.js)

Install frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

### Using Docker

To run the backend and MySQL database in Docker containers:

```bash
docker-compose up --build
```

- Backend will be exposed on port `9000`.
- MySQL database will be exposed on port `3306`.

Make sure to update `NEXT_PUBLIC_WEATHER_API_URL` to `http://localhost:9000` in your frontend environment variables when using Docker.

---

## API Usage

### Get Weather by City

**Endpoint:**

```
GET /api/weather?city={city_name}
```

**Response:**

```json
{
  "city": "City Name",
  "temperature": "20 °C",
  "humidity": "60%",
  "description": "clear sky"
}
```

---

## Testing

The backend uses PHPUnit for testing.

Run tests with:

```bash
php artisan test
```

A basic example test is included that checks the root route.

---

## Directory Structure

```
.
├── app/                    # Laravel application code
│   ├── Http/Controllers/Api/WeatherController.php
├── bootstrap/              # Laravel bootstrap files
├── config/                 # Configuration files
├── database/               # Migrations and seeders
├── public/                 # Public assets
├── resources/              # Frontend resources (views, etc.)
├── routes/                 # API and web routes
│   └── api.php             # API route definitions
├── tests/                  # PHPUnit tests
├── weather-frontend-nextjs/ # Next.js frontend app (React, TailwindCSS)
├── Dockerfile              # Backend Dockerfile
├── docker-compose.yml      # Docker Compose configuration
├── composer.json           # PHP dependencies and scripts
├── package.json            # Frontend dependencies and scripts
└── README.md               # Project documentation
```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
