import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { Users } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose'
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

  constructor(@InjectModel('Users') private readonly usersModel: Model<Users>) { }

  async signup(email: string, password: string, name: string, profileImage: string) {
    let user;
    try {
      user = await this.usersModel.findOne({ email }).exec();
    } catch (error) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = new this.usersModel({ email: email, password: hash, name: name, profileImage: profileImage })
      return await newUser.save();
    }
    if (user) {
      throw new ConflictException(`User with email: ${email} exists!`);
    } else {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = new this.usersModel({ email: email, password: hash, name: name, profileImage: profileImage })
      return await newUser.save();
    }
  }

  async login(email: string, password: string) {
    const foundUser = await this.usersModel.findOne({ email }).exec();
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return foundUser;
      }
      throw new NotFoundException(`Wrong Password`);
    }
    throw new NotFoundException(`Account Not Found`);
  }

  async getSingleUser(userId: string) {
    const user = await this.findUser(userId)
    // return user
    return {
      "userId": user._id,
      "email": user.email,
      "name": user.name,
      "profileImage": "http://localhost:5000/public/" + user.profileImage,
    };
  }

  async getUsers() {
    const users = await this.usersModel.find().exec();
    return users.map((users) => ({ id: users.id, email: users.email, name: users.name, profileImage: "http://localhost:5000/public/" + users.profileImage }))
  }

  private async findUser(id: string): Promise<Users> {
    let user;
    try {
      user = await this.usersModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException(`User Not Found With id: ${id}`);
    }
    return user;
  }
}

