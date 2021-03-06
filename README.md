# insurance_middleware

Express.js was used for this middleware. Routes were grouped according to its resources.

    app.use("/", authRouter);
    app.use("/clients", authenticateJWT, clientRouter);
    app.use("/policies", authenticateJWT, policyRouter);

## Authentication

I built a custom middleware. Policies and clients routes use it.

    app.use("/clients", authenticateJWT, clientRouter);

The process has the following steps:

- A user logins with its username and password (`/login`). **This password is the one that I was given** and each user's password input is compared to it because there isn't information about credentials in the `/clients` resource. This is a workaround.

Example:

    {
        "username": "Manning",
        "password": "given_password"
    }

- The user is searched in the Client Repository which does an initial request to `/clients` resource from the API (load).
- If the user is found, access and refresh tokens are returned in the response.
- The access token has to be added to every request as Authorization header preceded by **"Bearer "**.
- Refresh token has longer expire time than access one and its goal is to get a new token without login. When it expires, a new login is needed.

Example of login response:

    {
        "accessToken": "jwt_token",
        "refreshToken": "another_jwt_token",
        "type": "Bearer",
        "expires_in": "30m"
    }

## Scripts

- `npm run start`: to start the app
- `npm run lint`: to check for lint warning/errors
- `npm run keygen`: to generate a new secret code for jwt sign config. This will be printed in console
- `npm run test`: to run mocha tests considering file pattern

## Environment variables

**IMPORTANT**: Example credentials were left in the .env.example. This is not a good practice, it is only with the idea of easing the test and the review of the app.

These are the variables that need to be configured in .env file. API_URL is the url for the INSURANCE API which provides the information (https://dare-nodejs-assessment.herokuapp.com/api/). CLIENT_ID and CLIENT_SECRET are the credentials provided for authentication with this API. There are also the secrets and expirations times of both tokens. An .env.example file was added to the repository with the proper keys.

    PORT=
    API_URL=
    CLIENT_ID=
    CLIENT_SECRET=
    TOKEN_SECRET=
    TOKEN_EXPIRATION=
    REFRESH_TOKEN_SECRET=
    REFRESH_TOKEN_EXPIRATION=

## Design patterns

### Repository

I used an architecture design similar to Repository pattern to store clients and policies data. Both resources share logic related to roles and methods for getting information so they extend from Axios Repository where the common behaviour is.

#### Cache

In the repositories, the data and the **etag** from previous request is stored in a local variable. Each time it receives a new petition, it sends a get request to API with `If-None-Match` header and the etag value. If server did not change, the response would have 304 http status and the repository would retrieve its internal data.

### Singleton

This one was used for the import/export of client and policy repository.

## Custom axios

To avoid logic repetition, I created a custom instance of axios library with API_URL. I took advantage of axios interceptors (request/response). Every request has its **Authorization header** and each 401 response is handled obtaining a new token from the API. This way there is no need of manual authentication with INSURANCE API.
