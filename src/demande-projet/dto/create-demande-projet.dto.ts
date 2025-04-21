import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateDemandeProjetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  demandeAchatId: number;  // Ensure this field is treated as an integer.

  @IsNotEmpty()
  @IsInt()
  projetId: number;  // Added to associate with a specific Projet

  @IsOptional()
  @IsString()
  description?: string;
}
