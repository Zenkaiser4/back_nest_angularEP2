import { PartialType } from "@nestjs/mapped-types";
import { LoginAuthDto } from "./login-auth.dto"; // 👈 Corregido con 'L' mayúscula
import { IsNotEmpty } from "class-validator";

export class RegisterAuthDto extends PartialType(LoginAuthDto) { // 👈 Corregido con 'L' mayúscula
    @IsNotEmpty()
    name: string;
}