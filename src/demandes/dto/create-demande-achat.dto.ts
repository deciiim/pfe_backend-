import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateDemandeAchatDto {
  @IsString()
  readonly description: string;

  @IsString()
  readonly status: string;

  @IsInt()
  readonly requester_id: number;

  @IsInt()
  readonly project_id: number;
}
