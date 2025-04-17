import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateDemandeAchatDto {
  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly status?: string;

  @IsInt()
  @IsOptional()
  readonly requester_id?: number;

  @IsInt()
  @IsOptional()
  readonly project_id?: number;
}
