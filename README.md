# Next Blog API ⚙️

This is the API for the Next Blog project. It is a simple rest API that allows you to create, read, update and delete posts.

## Installation

After cloning the repository, run the following command to install the dependencies:

```bash
yarn install
```

Then you should create a `.env` file in the root of the project and add environment variables following the `.env.example` file.

The next step is to migrate the database and generate the prisma client:

```bash
yarn generate && yarn migrate:dev;
```

Finally, you can run the project in development mode:

```bash
yarn dev

```

## Responses

Every request will return a response body that implements the following interface:

```typescript
interface APIResponse<T = unknow> {
  success: boolean;
  message: string;
  data: T;
}
```

Notice that response will always contain the same fields, but the `data` may be `null`.

### Error responses

When a response return an error status code (4\*\* or 5\*\*), it will be described in the `message` field. Thus, the success field will be `false`.

Remember that this is a RESTful API and the reponses always will be devlivered with correct status codes following the [IANA HTTP status code standard](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).

## Documentation

The `docs` folder is where you can find the archive containing the `collection` exported from `Insomnia`.
