// src/demande-achat/dto/create-demande-achat.dto.ts
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDemandeAchatDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  montant: number;
}
