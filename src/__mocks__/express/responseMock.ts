import { Response } from 'express';

export const responseMock = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis()
} as unknown as Response;
