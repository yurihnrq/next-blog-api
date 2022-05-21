import { Prisma, User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../config/prisma.config';
import { IResponse } from '../types';

export const getUserById = async (req: Request, res: Response<IResponse>) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (user) {
      res.status(200).json({
        message: 'User fetched successfully',
        data: user
      });
    } else {
      res.status(404).json({
        message: 'No user found'
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Something went wrong, please try again later.'
    });
  }
};

export const getAllUsers = async (req: Request, res: Response<IResponse>) => {
  try {
    const { page } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;

    const users = await prisma.user.findMany({
      take: 10,
      skip: 10 * (pageInt - 1)
    });

    if (users.length > 0) {
      res.status(200).json({
        message: 'Users fetched successfully',
        data: users
      });
    } else {
      res.status(404).json({
        message: 'No users found'
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Something went wrong, please try again later.'
    });
  }
};

export const createUser = async (req: Request, res: Response<IResponse>) => {
  try {
    const { name, email, password, birthDate } = req.body as User;

    await prisma.user.create({
      data: {
        name,
        email,
        password,
        birthDate: new Date(birthDate)
      }
    });

    res.status(201).json({
      message: 'User created successfully'
    });
  } catch (error) {
    const { meta, code } = error as Prisma.PrismaClientKnownRequestError;
    console.log(error);

    if (code === 'P2002') {
      res.status(422).json({
        message: `User with provided ${meta?.target} already exists`
      });

      return;
    }

    res.status(500).json({
      message: 'Something went wrong, please try again later.'
    });
  }
};

export const deleteUser = async (req: Request, res: Response<IResponse>) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id
      }
    });

    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    const { meta, code } = error as Prisma.PrismaClientKnownRequestError;
    console.log(error);

    if (code === 'P2025') {
      res.status(400).json({
        message: 'User with provided id does not exist.'
      });
    } else {
      res.status(500).json({
        message:
          (meta?.cause as string) ||
          'Something went wrong, please try again later.'
      });
    }
  }
};

export const updateUser = async (req: Request, res: Response<IResponse>) => {
  try {
    const { id } = req.params;
    const { name, email, password, birthDate, biography } = req.body as User;

    await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email,
        password,
        birthDate: new Date(birthDate),
        biography
      }
    });

    res.status(200).json({
      message: 'User updated successfully'
    });
  } catch (error) {
    const { meta, code } = error as Prisma.PrismaClientKnownRequestError;
    console.log(error);

    if (code === 'P2025') {
      res.status(400).json({
        message: 'User with provided id does not exist.'
      });
    } else {
      res.status(500).json({
        message:
          (meta?.cause as string) ||
          'Something went wrong, please try again later.'
      });
    }
  }
};
