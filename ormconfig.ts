/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires

module.exports = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || '3306',
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  type: process.env.DB_CONNECTION || 'mysql',
  database: process.env.DB_DATABASE || '',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  migrations: ['dist/src/migrations/*.js'],
  factories: ['dist/src/factories/*.factory{.ts,.js}'],
  seeds: ['dist/src/seeders/*.js'],
  autoLoadEntities: true,
  cli: {
    entitiesDir: 'src',
    subscribersDir: 'src',
    migrationsDir: 'src/migrations',
  },
};
