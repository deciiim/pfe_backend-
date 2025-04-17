import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectsService } from './projects.service';  // This should be 'projects.service.ts'
import { ProjectsController } from './projects.controller';  // This should be 'projects.controller.ts'

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  providers: [ProjectsService],
  controllers: [ProjectsController]
})
export class ProjectsModule {}
