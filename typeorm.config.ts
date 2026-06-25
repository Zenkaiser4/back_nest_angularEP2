import { config } from 'dotenv';
import { DataSource } from 'typeorm';

// 👇 IMPORTACIÓN DIRECTA DE LA ENTIDAD (Déjala tal cual, esta ya funciona)
import { User } from './src/modules/users/entities/user.entity'; 

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
    entities: [User], 
    
    // 👇 CAMBIA ESTA LÍNEA EXACTAMENTE A ESTO:
    migrations: ['./src/database/migrations/*.ts'] 
});