import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

export const dbConfig: TypeOrmModuleOptions = { 
    type: 'postgres',
    //url: process.env.DATABASE_URL, 
    host: process.env.DB_HOST,
    //host: 'localhost',
    port: +process.env.DB_PORT,
    //port: 5432,
    username: process.env.DB_USER,
    //username: 'postgres',
    password: process.env.DB_PASSWORD,
    //password: 'reeisikk',
    database: process.env.DB_NAME,
    //database: 'washWorld',
    synchronize: true, // automatically generate a database based on my entities. Delete my data if needed.
    autoLoadEntities: true,
    migrations: ['dist/src/migrations/*{.ts,.js}'],
    };

    const dataSource = new DataSource(dbConfig as DataSourceOptions)
    export default dataSource;