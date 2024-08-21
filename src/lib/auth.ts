import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mysql, { type FieldPacket } from 'mysql2/promise';
import dotenv from 'dotenv';

console.log('lib/auth.ts');

dotenv.config();

const secret: string = process.env.AUTH_SECRET!;

const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

passport.use(new LocalStrategy(
  async (username, password, done) => {
    try {
      console.log('lib/auth.ts Authenticating user:', username);
      const [rows]: [any[], FieldPacket[]] = await db.query('SELECT id, ksywa, haslo, uprawnienia FROM realizatorzy WHERE ksywa = ?', [username]);
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
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const [rows] = await db.query('SELECT id, ksywa, haslo, uprawnienia FROM realizatorzy WHERE id = ?', [jwt_payload.id]);
    const user = rows[0];
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
}));

export function generateToken(user: any) {
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
