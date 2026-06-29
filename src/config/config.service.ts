import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path'; // 💡 Añadimos el módulo path nativo de Node
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const env = process.env.NODE_ENV || 'development';
        
        // 💡 Solución: process.cwd() apunta SIEMPRE a la raíz del proyecto de forma segura
        const envFilePath = path.resolve(process.cwd(), `.env.${env}`);
        const existsPath = fs.existsSync(envFilePath);

        if (!existsPath) {
            // 💡 Corregido para que imprima el nombre real que falló
            console.log(`Error crítico: El archivo de entorno [.env.${env}] no existe en la raíz.`);
            process.exit(0);
        }

        this.envConfig = parse(fs.readFileSync(envFilePath));
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}