import { Response } from 'express';

export const responseMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  locals: {} as object
} as unknown as Response;
