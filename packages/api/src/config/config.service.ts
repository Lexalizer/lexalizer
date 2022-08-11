import * as fs from 'fs/promises';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';

type ConfigurationType = {
  jwtSecret?: string;
  jwtExpiration?: string;
};

@Injectable()
export class ConfigurationService {
  static jwtSecret: string;
  static jwtExpiration: string;

  static async initializeEnvironment(): Promise<void> {
    if (this.jwtSecret && this.jwtExpiration) {
      return;
    }

    let savedConfiguration = await this.loadConfiguration();

    if (!savedConfiguration) {
      savedConfiguration = {};
    }

    this.handleMultipleSources(
      'JWT_SECRET',
      savedConfiguration,
      'jwtSecret',
      crypto.randomBytes(256).toString('base64')
    );
    this.handleMultipleSources(
      'JWT_EXPIRATION',
      savedConfiguration,
      'jwtExpiration',
      '1d'
    );

    await this.saveConfiguration(savedConfiguration);
  }

  static handleMultipleSources(
    envVariableName: string,
    savedConfiguration: ConfigurationType,
    attributeName: string,
    newValue: any
  ) {
    const envValue = process.env[envVariableName];
    const savedValue = savedConfiguration[attributeName];
    if (envValue) {
      this[attributeName] = envValue;
    } else if (!envValue && savedValue) {
      this[attributeName] = savedValue;
    } else if (!envValue && !savedValue) {
      this[attributeName] = newValue;
    }
    savedConfiguration[attributeName] = this[attributeName];
    process.env[envVariableName] = this[attributeName];
  }

  static async loadConfiguration(): Promise<ConfigurationType> {
    return fs
      .readFile('./config.json', 'utf8')
      .then((data) => {
        return JSON.parse(data);
      })
      .catch(() => {
        return null;
      });
  }

  static async saveConfiguration(data: ConfigurationType): Promise<void> {
    return fs.writeFile('./config.json', JSON.stringify(data, null, 2), 'utf8');
  }
}
