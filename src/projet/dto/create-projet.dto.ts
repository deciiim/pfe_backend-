// create-projet.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateProjetDto {
  @IsNotEmpty()
  @IsString()
  title: string;  // ✅ This now matches the entity field

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsNotEmpty()
  createdById: number;  // This is now required to associate the user with the projet
}
