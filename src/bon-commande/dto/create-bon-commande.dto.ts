import {
  IsNotEmpty,
  IsDateString,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
  IsInt
} from 'class-validator';
import { BonCommandeStatus } from '../enum/bon-commande-status.enum';

export class CreateBonCommandeDto {
  @IsNotEmpty()
  @IsString()
  reference: string;

  @IsNotEmpty()
  @IsDateString()
  date: string;

  @IsNotEmpty()
  @IsNumber()
  fournisseurId: number;

  @IsNotEmpty()
  @IsNumber()
  demandeAchatId: number;

  @IsOptional()
  @IsNumber()
  montantTotal?: number;

  @IsOptional() // Status is optional on creation
  @IsEnum(BonCommandeStatus)
  status?: BonCommandeStatus;
  
  @IsOptional()
  @IsInt()
  demandeProjetId?: number;
}
