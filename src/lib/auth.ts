import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql, { type FieldPacket, type RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// Function to retrieve required environment variables
const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const secret: string = process.env.AUTH_SECRET!; // Secret for JWT signing

// MySQL database connection pool
const db = mysql.createPool({
  host: requiredEnv('DB_HOST'),
  port: Number(requiredEnv('DB_PORT')),
  user: requiredEnv('DB_USER'),
  password: requiredEnv('DB_PASSWORD'),
  database: requiredEnv('DB_NAME'),
});

// Type definition for user data
interface UserRow extends RowDataPacket {
  id: number;
  username: string;
  passwordHash: string;
  role: string;
}

// Local strategy for username and password authentication
passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      const [rows]: [UserRow[], FieldPacket[]] = await db.query(
        'SELECT id, username, passwordHash, role FROM users WHERE username = ?',
        [username]
      );
      const user = rows[0];
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      const res = await bcrypt.compare(password, user.passwordHash);
      if (res) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      return done(err);
    }
  }
));

// JWT strategy for token-based authentication
const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    ExtractJwt.fromUrlQueryParameter('token'),
    (req) => req.cookies?.token
  ]),
  secretOrKey: secret
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const [rows]: [UserRow[], FieldPacket[]] = await db.query(
      'SELECT id, username, passwordHash, role FROM users WHERE id = ?',
      [jwt_payload.id]
    );
    const user = rows.length > 0 ? rows[0] : null;
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}));

// Function to generate JWT token
export function generateToken(user: UserRow) {
  return jwt.sign({ id: user.id, username: user.username, role: user.role }, secret, { expiresIn: '1h' });
}

// Function to verify JWT token
export function verifyToken(token: string): any {
  const decoded = jwt.verify(token, secret) as any;
  return {
    id: decoded.id,
    username: decoded.username,
    role: decoded.role
  };
}

export default passport;
