import { prisma } from '../prisma/client.js'; // Path til din prisma client
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Registrer ny bruker
export async function registerUser({ email, password }) {    
  // Sjekk om bruker allerede finnes
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash passord
  const hashedPassword = await bcrypt.hash(password, 10);

  // Lag bruker i databasen
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword   
    },
  });

  return user;
}

// Login-funksjon
export async function loginUser({ email, password }) {
  // Finn bruker i databasen
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  // Sjekk passord
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) throw new Error('Invalid email or password');

  // ⚡ Generer token
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET || 'supersecret', // bruk miljøvariabel i produksjon
    { expiresIn: '1h' }
  );

  // Returner token + evt brukerinfo
  return { token, user: { id: user.id, email: user.email, name: user.name } };
}

export async function getProfileService(userId) {
  const user = await prisma.user.findUnique({
    where: { id: Number(userId) },
    select: { id: true, email: true }
  });

  if (!user) throw new Error('User not found'); // kast feil, controller håndterer respons

  return user;
}
