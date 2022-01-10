import { Injectable } from '@nestjs/common';
import { getCompleteUrlPath } from './utils';
import { aboutJson } from './about.model';
@Injectable()
export class AppService {

  async getAboutJson(): Promise<any> {
      return aboutJson;
  }

}
