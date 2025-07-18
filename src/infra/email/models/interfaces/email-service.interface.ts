export interface EmailServiceInterface {
  send(options: SendEmailOptions): Promise<void>;
}

export interface SendEmailOptions {
  to: string;
  subject: string;
  template: string;
  context: Record<string, string | number>;
}
