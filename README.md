# Card Validator Platform

A full-stack application built for the Tobams Group Backend Intern Assessment. This project consists of a robust **NestJS API** and a **React + Tailwind CSS** frontend to validate credit card numbers using the industry-standard Luhn Algorithm.

## Project Overview
The platform provides a secure and efficient way to verify the validity of credit card numbers. It handles input sanitization, length verification, and mathematical checksum validation.

## 🛠 Tech Stack
- **Backend:** Node.js, TypeScript (Strict Mode), NestJS
- **Frontend:** React, Tailwind CSS (v4), Vite
- **Testing:** Jest
- **Validation:** Class-validator, Class-transformer

---

## Design Decisions & Reasoning

### 1. The Luhn Algorithm
For the validation logic, I implemented the **Luhn Algorithm (Mod 10)**. 
- **Why:** It is the global standard for validating various identification numbers, especially credit cards. It is more reliable than simple regex because it validates the mathematical relationship between digits to catch accidental typos.

### 2. NestJS Framework
I chose NestJS for the backend architecture.
- **Why:** It provides a modular, scalable structure out of the box. Using Controllers, Services, and DTOs ensures a clean **Separation of Concerns**, making the code highly maintainable and testable.

### 3. TypeScript Strict Mode
As required by the assessment, `strict: true` is enabled in `tsconfig.json`.
- **Why:** This ensures maximum type safety, forcing the handling of potential `null` or `undefined` values and preventing common runtime errors.

### 4. Input Sanitization & Error Handling
- **Sanitization:** The API gracefully handles inputs containing spaces or dashes by stripping non-numeric characters before validation.
- **Validation:** I implemented a **Global Validation Pipe** using `class-validator` to ensure that empty or malformed requests are caught before they reach the service layer, returning appropriate HTTP 400 status codes.

---

## 📂 Project Structure
```text
card-validator/        # Backend (NestJS)
card-validator-ui/     # Frontend (React)
```
---


## Project setup (Backend)

```bash
$ cd card-validator
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Project setup (Frontend)

```bash
$ cd card-validator-ui
$ npm install
```

## Run the project

```bash
# development
$ npm run dev

# production mode
$ npm run build
```

## API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/cards/validate` | Validate a credit card number |

### Request Body

```json
{
  "cardNumber": "4242424242424242"
}
```

### Response Body

```json
Successful Response (Valid):
{
  "isValid": true,
  "message": "Card number is valid"
}

Error Response (Invalid Input):
{
  "error": "Validation failed",
  "message": [
    "Card number must be a string"
  ],
  "statusCode": 400
}
```
