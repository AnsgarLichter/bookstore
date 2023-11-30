# Bookstore

An API for a bookstore using Express and MongoDB with Mongoose. This project is used to test the compatibility of express with [Bun](https://bun.sh/).
You will find the Node.js version in the [main](https://github.com/AnsgarLichter/bookstore) branch and the version for Bun in the branch [feature-migrate-to-bun](https://github.com/AnsgarLichter/bookstore/tree/feature-migrate-to-bun).

## Features

This API includes the following features:

| Feature                                    | Info               |
|--------------------------------------------|--------------------|
| ORM Integration                            | Mongoose           |
| Logging                                    | Winston            |
| Logging of the HTTP-Requests               | Morgan             |
| Validations                                | Joi                |
| Secure application by setting HTTP-Headers | Helmet             |
| Response Compression                       | Compression        |
| Error Handling                             | Own Error Handler  |

## Installation

Install the dependencies

```bash
bun install
```

Create a .env file with the following properties:

- URL to a running [MongoDB](https://www.mongodb.com/cloud/atlas/register).

```dotenv
database_url="<url>"
```

## Running the app

To run the app locally:

```bash
bun run dev
```

To run the minified version of the app:

```bash
bun run prod
```

## Sending API requests

### Books

#### Creating a Book

| Property | Value         |
|----------|---------------|
| Endpoint | /api/v1/books |
| Method   | POST          |
| Body     | Book & Author |
| Response | Created Book  |

```json
{
    "title": "<title",
    "isbn": "<isbn></isbn>",
    "author": {
        "name": "<full name>"
    }
}
```

#### Read all Books

| Property | Value         |
|----------|---------------|
| Endpoint | /api/v1/books |
| Method   | GET           |
| Body     | -             |
| Response | All books     |

#### Read a Book

| Property | Value              |
|----------|--------------------|
| Endpoint | /api/v1/books/{id} |
| Method   | GET                |
| Body     | -                  |
| Response | Book               |

#### Read Books by its Author

| Property | Value                         |
|----------|-------------------------------|
| Endpoint | /api/v1/books?author=<author> |
| Method   | GET                           |
| Body     | -                             |
| Response | Books by Author               |

#### Read Author of Book

| Property | Value                     |
|----------|---------------------------|
| Endpoint | /api/v1/books/{id}/author |
| Method   | GET                       |
| Body     | -                         |
| Response | Author                    |

#### Update a Book

| Property | Value               |
|----------|---------------------|
| Endpoint | /api/v1/books/{id}  |
| Method   | PUT                 |
| Body     | Book & Author       |
| Response | Updated Book        |

```json
{
    {
    "title": "<Updated Title>",
    "author": {
        "name": "<Updated Author>"
    }
}
}
```

#### Delete a Book

| Property | Value              |
|----------|--------------------|
| Endpoint | /api/v1/books/{id} |
| Method   | DELETE             |
| Body     | -                  |
| Response | -                  |

### Authors

#### Creating a Author

| Property | Value           |
|----------|-----------------|
| Endpoint | /api/v1/authors |
| Method   | POST            |
| Body     | Author          |
| Response | Created Author  |

```json
{
    "name": "<full name>"
}
```

#### Read all Authors

| Property | Value           |
|----------|-----------------|
| Endpoint | /api/v1/authors |
| Method   | GET             |
| Body     | -               |
| Response | All authors     |

#### Read an Author

| Property | Value                |
|----------|----------------------|
| Endpoint | /api/v1/authors/{id} |
| Method   | GET                  |
| Body     | -                    |
| Response | Authors              |

#### Update an Author

| Property | Value                |
|----------|----------------------|
| Endpoint | /api/v1/authors/{id} |
| Method   | PUT                  |
| Body     | Author               |
| Response | Updated Author       |

```json
{
    "name": "<updated name>"
}
```

#### Delete an Author

| Property | Value                |
|----------|----------------------|
| Endpoint | /api/v1/authors/{id} |
| Method   | DELETE               |
| Body     | Author               |
| Response | -                    |
