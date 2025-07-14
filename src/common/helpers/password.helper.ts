import bcrypt from 'bcrypt';

export class PasswordHelper {
  static async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  static hashPassword(password: string, salt: number = 10): string {
    return bcrypt.hashSync(password, salt);
  }
}
