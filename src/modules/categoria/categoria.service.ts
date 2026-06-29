import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm'; // 💡 Añadido
import { Categoria } from './entities/categoria.entity'; // 💡 Añadido (revisa si tu carpeta es 'entities')
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriaService {

  constructor(
    @Inject('CATEGORIA_REPOSITORY')
    private categoriaRepository: Repository<Categoria>, // 💡 Corregido el cierre del constructor
  ) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return 'This action adds a new categoria';
  }

  async findAll() {
    return await this.categoriaRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} categoria`;
  }

  update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    return `This action updates a #${id} categoria`;
  }

  remove(id: number) {
    return `This action removes a #${id} categoria`;
  }
}