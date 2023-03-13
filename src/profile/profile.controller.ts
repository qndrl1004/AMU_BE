import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators';
import { AuthService } from 'src/auth/auth.service';
import { CreateProfileDto } from './dto/createProfile.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { ProfileService } from './profile.service';
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private authService: AuthService,
  ) {}

  @Post()
  async createProfile(
    @Headers('cookie') cookie,
    @Body() profiledata: CreateProfileDto,
  ) {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0];
    this.profileService.createProfile(String(email), profiledata);
    return { message: '프로필 정보가 등록되었습니다.' };
  }

  @Get()
  async getBasicProfile(@Headers('cookie') cookie) {
    const info = await this.authService.parseToken(cookie);
    return await this.profileService.getBasicProfile(info);
  }

  @Get('/detail')
  async getDetailProfile(@Headers('cookie') cookie) {
    const info = await this.authService.parseToken(cookie);
    return await this.profileService.getEditProfile(info);
  }

  @Put('/edit')
  async editProfile(
    @Headers('cookie') cookie,
    @Body() updateData: EditProfileDto,
  ) {
    const info = await this.authService.parseToken(cookie);
    const email = Object.values(info)[0];
    await this.profileService.editProfile(email, updateData);
    return { message: '프로필 정보가 변경되었습니다.' };
  }
}