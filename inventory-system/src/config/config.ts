// @ts-expect-error 7016
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

  public static routesPath = path.join(__dirname, '../routes');
}
