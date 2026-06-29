import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm'; // 👈 Asegúrate de tener este import nativo
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { DatabaseModule } from '../../database/database.module';
import { Categoria } from './entities/categoria.entity'; 

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriaController],
  providers: [
    CategoriaService,
    {
      provide: 'CATEGORIA_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Categoria),
      inject: [DataSource], // 💡 ¡MIRA AQUÍ! Asegúrate de que NO tenga comillas. Debe ser la clase DataSource directa.
    },
  ],
  exports: [CategoriaService],
})
export class CategoriaModule {}