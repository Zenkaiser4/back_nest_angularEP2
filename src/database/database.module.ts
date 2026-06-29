import { Module } from '@nestjs/common';
import { databaseProvider } from './database.providers';
import { ConfigService } from 'src/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { Categoria } from '../modules/categoria/entities/categoria.entity'; // 💡 1. Importa tu entidad aquí (revisa que la ruta coincida)
import { User } from '../modules/users/entities/user.entity'; // 💡 Importa también User si lo usas

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                type: 'postgres',
                host: config.get('HOST') || 'localhost',
                port: +config.get('PORT'), 
                username: config.get('USERNAME') || 'root',
                password: config.get('PASSWORD') || 'prueba',
                database: config.get('DATABASE'),
                
                // 💡 2. Pasamos las clases de las entidades directamente en el arreglo. ¡Esto nunca falla!
                entities: [
                    Categoria,
                    User
                ],
                synchronize: false, // Asegúrate de tenerlo en false al usar migraciones
            })
        })
    ],
    providers: [...databaseProvider, ConfigService],
    exports: [...databaseProvider]
})
export class DatabaseModule {}