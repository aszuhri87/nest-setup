import {
  UseInterceptors,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthDto } from './dto/auth.dto';
import { User } from '../user/entities/user.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({
    status: 201,
    description: 'Login Success',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('/login')
  async login(@Body() authDto: AuthDto): Promise<any> {
    const user = authDto.user;

    const token = await this.authService.login(user, authDto.password);
    return { token };
  }

  @ApiBearerAuth()
  @Get('/profile')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: 201,
    description: 'Succes',
    type: User,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getProfile(@Request() req) {
    return this.authService.profile(req.user.id);
  }
}
