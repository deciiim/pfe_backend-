import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDemandeAchatDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}
