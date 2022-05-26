import { Prisma, User } from '@prisma/client';
import prisma from '../config/prisma.config';
import bcrypt from 'bcrypt';
import { Controller } from '../types';

export const getUserById: Controller = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    if (user) {
      return res.status(200).json({
        message: 'User fetched successfully',
        data: user
      });
    } else {
      return res.status(404).json({
        message: 'No user found'
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong, please try again later.'
    });
  }
};

export const getAllUsers: Controller = async (req, res) => {
  try {
    const { page } = req.query;

    const pageInt = page ? parseInt(page as string) : 1;

    const users = await prisma.user.findMany({
      take: 10,
      skip: 10 * (pageInt - 1)
    });

    if (users.length > 0) {
      return res.status(200).json({
        message: 'Users fetched successfully',
        data: users
      });
    } else {
      return res.status(404).json({
        message: 'No users found'
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong, please try again later.'
    });
  }
};

export const createUser: Controller = async (req, res) => {
  try {
    const { name, email, password, birthDate } = req.body as User;

    await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        birthDate: new Date(birthDate)
      }
    });

    return res.status(201).json({
      message: 'User created successfully'
    });
  } catch (error) {
    const { meta, code } = error as Prisma.PrismaClientKnownRequestError;

    if (code === 'P2002') {
      return res.status(422).json({
        message: `User with provided ${meta?.target} already exists`
      });
    }

    return res.status(500).json({
      message: 'Something went wrong, please try again later.'
    });
  }
};

export const deleteUser: Controller = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: {
        id
      }
    });

    return res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    const { code } = error as Prisma.PrismaClientKnownRequestError;

    if (code === 'P2025') {
      return res.status(400).json({
        message: 'User with provided id does not exist.'
      });
    } else {
      return res.status(500).json({
        message: 'Something went wrong, please try again later.'
      });
    }
  }
};

export const updateUser: Controller = async (req, res) => {
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
        password: bcrypt.hashSync(password, 10),
        birthDate: new Date(birthDate),
        biography
      }
    });

    return res.status(200).json({
      message: 'User updated successfully'
    });
  } catch (error) {
    const { code } = error as Prisma.PrismaClientKnownRequestError;

    if (code === 'P2025') {
      return res.status(400).json({
        message: 'User with provided id does not exist.'
      });
    } else {
      return res.status(500).json({
        message: 'Something went wrong, please try again later.'
      });
    }
  }
};
