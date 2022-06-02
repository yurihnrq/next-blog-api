import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

prisma.$use(async (req, next) => {
  if (req.model === 'User') {
    req.args.select = {
      id: true,
      name: true,
      email: true,
      birthDate: true,
      biography: true
    };
  }

  return next(req);
});

export default prisma;
