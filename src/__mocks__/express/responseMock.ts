import { Response } from 'express';

export const responseMock = {
  locals: {} as object
} as unknown as Response;

Object.defineProperty(responseMock, 'status', {
  value: function () {
    return this;
  },
  writable: true
});

Object.defineProperty(responseMock, 'json', {
  value: function () {
    return this;
  },
  writable: true
});
