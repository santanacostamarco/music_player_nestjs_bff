import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}

enum Colors {
  GREEN = '\x1b[32m',
  RED = '\x1b[31m',
  GRAY = '\x1b[90m',
  RESET = '\x1b[0m',
}

bootstrap()
  .then(() => {
    console.log(
      `${Colors.GREEN}%s${Colors.RESET}`,
      'App bootstrapped successfully! 🚀',
    );
  })
  .catch((err) => {
    console.error(
      `${Colors.RED}%s${Colors.RESET}`,
      'Failed to bootstrap the app. 💥',
    );
    console.error(`${Colors.GRAY}%s${Colors.RESET}`, err);
  });
