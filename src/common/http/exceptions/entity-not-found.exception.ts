import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entity = 'Entity') {
    super(`${entity} not found`);
  }
}
