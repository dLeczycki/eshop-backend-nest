import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from '../user/entities/user.entity';
import { JwtPayload } from './jwt.strategy';
import { config } from '../config/config';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../user/entities/user-role.entity';
import { Role } from '../user/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto): Promise<{ user: User; jwtToken: string }> {
    const user = await this.validateLoginData(loginData);
    await this.generateTokenIdForUser(user);
    const jwtToken = this.createJwtTokenForUser(user);

    return { user, jwtToken };
  }

  async logout(user: User): Promise<void> {
    user.tokenId = '';
    await user.save();
  }

  async register(registerData: RegisterDto): Promise<void> {
    await this.validateRegisterData(registerData);
    const user = User.create(registerData);

    await this.generatePasswordHashForUser(user, registerData.password);
    await user.save();

    await this.addDefaultRoleForUser(user);
  }

  private async generatePasswordHashForUser(
    user: User,
    plainPassword: string,
  ): Promise<void> {
    const passwordHash = await bcrypt.hash(plainPassword, 10);
    user.passwordHash = passwordHash;
  }

  private async addDefaultRoleForUser(user: User): Promise<void> {
    const userRole = UserRole.create();
    userRole.user = user;
    userRole.role = Role.USER;
    await userRole.save();
  }

  async validateRegisterData(registerData: RegisterDto): Promise<void> {
    const { username, email } = registerData;

    const userWithUsername = await User.findOne({ username });

    if (userWithUsername)
      throw new BadRequestException('Użytkownik o tej nazwie już istnieje');

    const userWithEmail = await User.findOne({ email });

    if (userWithEmail)
      throw new BadRequestException('Podany email jest już wykorzystywany');
  }

  private async validateLoginData(loginData: LoginDto): Promise<User> {
    const { email, password } = loginData;
    const user = await this.userService.findOne({ email });

    if (!user) throw new BadRequestException();

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatch) throw new BadRequestException();

    return user;
  }

  private async generateTokenIdForUser(user: User): Promise<void> {
    const tokenId = await this.generateUniqueTokenId();
    user.tokenId = tokenId;
    await user.save();
  }

  private createJwtTokenForUser(user: User): string {
    const payload: JwtPayload = { tokenId: user.tokenId };
    const jwtToken = this.jwtService.sign(payload, {
      secret: config.jwt.secret,
      expiresIn: config.jwt.expiresIn,
    });

    return jwtToken;
  }

  private async generateUniqueTokenId(): Promise<string> {
    let tokenId = null;
    let userWithThisToken = null;

    do {
      tokenId = uuid();
      userWithThisToken = await this.userService.findOne({ tokenId });
    } while (!!userWithThisToken);

    return tokenId;
  }
}
