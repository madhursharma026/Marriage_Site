import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { VisitSchema } from './entities/visit.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MulterModule.register({ dest: './uploadedImages' }), MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]), MongooseModule.forFeature([{ name: 'Visits', schema: VisitSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
