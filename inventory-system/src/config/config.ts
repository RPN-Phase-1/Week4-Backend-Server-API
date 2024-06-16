import dotenv from 'dotenv';
import path from 'node:path';
import process from 'node:process';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

type EnvirontmentType = 'test' | 'development' | 'production';

export default class Config {
  public static env = process.env.NODE_ENV as EnvirontmentType;

  public static port = process.env.PORT;

  public static database = { url: process.env.DATABASE_URL };

  public static jwt = {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDay: process.env.JWT_REFRESH_EXPIRATION_DAYS,
  };

  public static routesPath = path.join(__dirname, '../routes');
}
