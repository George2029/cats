import { PipeTransform, ArgumentMetadata, HttpException } from '@nestjs/common';
import { ZodSchema  } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new HttpException({message: 'Invalid input', error: 'login or password are missing', statusCode: 405}, 405);
    }
  }
}
