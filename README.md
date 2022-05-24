## Responses
Every request will return a response body that implements the following interface:
```typescript
interface IResponseBody<T = unknow>{
  message: string;
  data?: unknown;
}
```
I would recomend you to use the `IResponseBody` interface in your front-end code.
Its supports generics, so you can use it to treat the response with the expected `data`.

You may will implement something like:
```typescript
interface IReponse<T = unknow> {
  status: number;
  body: IResponseBody<T>;
}
```

Notice that response will `always contain a message`. If the request was successful,
the response may will also contain a `data` field.

### Error responses
When a response return an error status code (4** or 5**), it will be described in the
`message` field.

Remember that this is a RESTful API and the reponses always will be devlivered with correct
status codes following the [IANA HTTP status code standard](https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml).

## Docs folder
The `docs` folder is where you can find the archive containing the collection exported from
Insomnia. With this file you can easily get all routes imported in you favorite RESTful client
and then use it to make requests to the API.
