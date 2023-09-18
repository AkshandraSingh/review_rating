# 🌟 ReviewRating 🌟

**ReviewRating** is a project that allows users to rate and review companies. It provides APIs for creating, updating, and deleting company reviews, as well as managing user accounts. This README provides an overview of the project's structure, usage, and important details.

## 📋 Table of Contents

- [🏗️ Project Structure](#project-structure)
- [🚀 Installation](#installation)
- [🔥 Usage](#usage)
- [📡 API Endpoints](#api-endpoints)
- [⚙️ Middlewares](#middlewares)
- [🛠️ Services](#services)
- [🧪 Testing](#testing)
- [🤝 Contributing](#contributing)

## 🏗️ Project Structure

The project follows a structured directory layout to keep the code organized. Here is an overview of the main directories and their purposes:

- **config**: Contains configuration files, such as database configuration and environment variables.
- **controllers**: Contains controller functions for handling API requests.
- **middlewares**: Custom middleware functions used in the application.
- **models**: Defines data models for the database.
- **routes**: Defines API routes and connects them to controller functions.
- **services**: Contains business logic and services used by the controllers.
- **tests**: Contains test files for the project.
- **uploads**: Directory for storing uploaded files, such as company profile pictures.
- **utils**: Utility functions and helpers.

## 🚀 Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```shell
   git clone https://github.com/ishansingh1010/review_rating
   cd ReviewRating
   ```

2. Install dependencies:

   ```shell
   npm install
   ```

3. Set up the environment variables by creating a `.env` file and populating it with the required values. You can use the `.env.example` file as a template.

4. Start the server:

   ```shell
   npm start
   ```

The project should now be running locally at `http://localhost:9000`.

## 🔥 Usage

To use the **ReviewRating** project, you can interact with its APIs using a tool like [Postman](https://www.postman.com/) or by integrating the APIs into your frontend application.

Ensure that you have set up the project locally and the server is running.

## 📡 API Endpoints

The project exposes the following API endpoints:

- `POST /api/users/create`: Create a user account.
- `POST /api/users/login`: Log in with a user account.
- `POST /api/users/emailSend`: Send an email for password reset.
- `POST /api/users/resetPassword/:userId/:token`: Reset the user's password.
- `POST /api/company/createCompany`: Create a company.
- `GET /api/company/listCompany`: List all companies.
- `GET /api/company/detailsCompany/:id`: Get details of a specific company.
- `GET /api/company/sortCompany`: List companies in sorted order.
- `GET /api/company/searchCompany/:letter`: Search for companies by the first letter of their name.
- `POST /api/companyReview/createReview`: Create a company review.
- `PATCH /api/companyReview/updateReview/:id`: Update a company review.
- `DELETE /api/companyReview/deleteReview/:id`: Delete a company review.

## ⚙️ Middlewares

The project uses custom middlewares for various purposes, such as authentication and request validation. Some key middlewares include:

- `authMiddleware`: Handles user authentication using JSON Web Tokens (JWT).
- `validationMiddleware`: Validates request data using Joi schemas.
- `multerMiddleware`: Handles file uploads.

## 🛠️ Services

The `services` directory contains business logic and services used by the controllers. These services handle interactions with the database and perform various operations.

## 🧪 Testing

The project includes test cases to ensure its functionality is working as expected. You can run the tests using the following command:

```shell
npm test
```

Make sure to update the test cases as needed when making changes to the project.

## 🤝 Contributing

Contributions to the project are welcome. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and write tests if necessary.
4. Submit a pull request with a clear description of your changes.
