import { config } from 'dotenv';
import { DataSource } from 'typeorm';

const env = process.env.NODE_ENV || 'development';

config({
    override: true,
    path: `.env.${env}`,
    debug: true 
});

export default new DataSource({
    type: 'postgres',
    host: process.env.HOST,
    port: +(process.env.PORT ?? 5432), 
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    synchronize: false, 
    
    // 👇 CAMBIA ESTA LÍNEA EXACTAMENTE A ESTO:
    // Borra los imports manuales de arriba y pon este comodín. 
    // Buscará cualquier archivo que termine en .entity.ts dentro de src
    entities: ['./src/**/*.entity.ts'], 
    
    migrations: ['./src/database/migrations/*.ts'] 
});