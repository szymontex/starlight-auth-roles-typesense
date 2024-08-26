import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql, { type FieldPacket, type RowDataPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

console.log('lib/auth.ts');

dotenv.config();
const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const secret: string = process.env.AUTH_SECRET!;

const db = mysql.createPool({
  host: requiredEnv('DB_HOST'),
  port: Number(requiredEnv('DB_PORT')),
  user: requiredEnv('DB_USER'),
  password: requiredEnv('DB_PASSWORD'),
  database: requiredEnv('DB_NAME'),
});

console.log('lib/auth.ts Environment variables:');
console.log('lib/auth.ts DB_HOST:', process.env.DB_HOST);
console.log('lib/auth.ts DB_PORT:', process.env.DB_PORT);
console.log('lib/auth.ts DB_USER:', process.env.DB_USER);
console.log('lib/auth.ts DB_NAME:', process.env.DB_NAME);
console.log('lib/auth.ts AUTH_SECRET:', process.env.AUTH_SECRET ? 'Set' : 'Not set');
// Typy danych użytkownika oraz wyników zapytania
interface UserRow extends RowDataPacket {
  id: number;
  ksywa: string;
  haslo: string;
  uprawnienia: string;
}

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log('lib/auth.ts Authenticating user:', username);
      const [rows]: [UserRow[], FieldPacket[]] = await db.query('SELECT id, ksywa, haslo, uprawnienia FROM realizatorzy WHERE ksywa = ?', [username]);
      const user = rows[0];
      if (!user) {
        console.error('lib/auth.ts User not found:', username);
        return done(null, false, { message: 'Incorrect username.' });
      }
      const res = await bcrypt.compare(password, user.haslo);
      console.log('lib/auth.ts Comparing passwords:', { enteredPassword: password, storedHash: user.haslo, result: res });
      if (res) {
        console.log('lib/auth.ts Password match successful for user:', username);
        return done(null, user);
      } else {
        console.error('lib/auth.ts Password does not match for user:', username);
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      console.error('lib/auth.ts Error during authentication:', err);
      return done(err);
    }
  }
));

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
    const [rows]: [UserRow[], FieldPacket[]] = await db.query('SELECT id, ksywa, haslo, uprawnienia FROM realizatorzy WHERE id = ?', [jwt_payload.id]);
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

export function generateToken(user: UserRow) {
  return jwt.sign({ id: user.id, username: user.ksywa, role: user.uprawnienia }, secret, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
  const decoded = jwt.verify(token, secret) as any;
  return {
    id: decoded.id,
    username: decoded.username,
    role: decoded.role
  };
}

export default passport;
