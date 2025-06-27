import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface User {
  id: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser(username: string, password: string): User | null {
    if (username === 'admin' && password === 'securepassword') {
      return { id: '1', username: 'admin' };
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
