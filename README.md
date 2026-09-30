# Node.js PostgreSQL connection check

A small Node.js application that connects to PostgreSQL using the `pg` driver and verifies the connection with a query.

## Requirements

- Node.js 20 or later
- A running PostgreSQL container

## Configure

Edit the root `.env` file. Either set `DATABASE_URL` or leave it blank and fill in `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB`. When `DATABASE_URL` is set, it takes precedence over the individual settings.

Example URL:

```text
postgresql://username:password@localhost:5432/database_name
```

If the password contains special characters in a URL, URL-encode them. Using the individual settings avoids that requirement.

For a Node app running on your computer, use `localhost` as the host and ensure the container publishes its PostgreSQL port (for example, `-p 5432:5432`). If the Node app also runs in Docker, put both containers on the same Docker network and use the PostgreSQL container/service name as `POSTGRES_HOST`.

## Run

Install dependencies, then run the connection check:

```sh
npm install
npm start
```

For automatic restart during development, use `npm run dev`.

The app prints the connected database, user, and PostgreSQL server version. Connection errors are printed to the console and result in a non-zero exit status.
