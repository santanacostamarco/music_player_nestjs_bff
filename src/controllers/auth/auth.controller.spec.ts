import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { Response } from 'express';
import { AuthService } from '@/services/auth.service';

describe('AppController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = app.get<AuthController>(AuthController);
  });

  describe('/login', () => {
    it('should redirect to spotfy login url', () => {
      const mockResponse = {
        redirect: jest.fn(() => {}),
      };

      authController.login(mockResponse as unknown as Response);

      expect(mockResponse.redirect).toHaveBeenCalledWith(
        expect.stringContaining('/authorize'),
      );
    });
  });
});
