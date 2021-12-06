import { Controller, Inject, CACHE_MANAGER, Post, Body, Get, Logger, Res, HttpStatus } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { AppService } from './app.service';
import { Garment, Garments } from './models/garment.model';
import SearchDTO from './dtos/search.dto';
import { FastifyReply } from 'fastify';

type QueryResults = Garment | Garments | null;

@Controller()
export class AppController {
  private readonly logger: Logger = new Logger(AppController.name);

  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  @Get()
  test(): string {
    return "success";
  }

  @Post()
  async getSpecificGarments(@Body() search: SearchDTO, @Res() res: FastifyReply): Promise<QueryResults> {
    this.logger.log(JSON.stringify(search));
    // TODO: Validate the search string
    const value: QueryResults = await this.cacheManager.get(search.search);
    // if the search has already been performed before and is stored in redis, return it
    if (value) {
      this.logger.log(`value found in redis: ${value}`);
      return value;
    // else perform a search, then store the search result in redis and return said result
    } else {
      this.logger.log("value not found in redis!");
      const searchResult = await this.appService.findSpecificGarments(search);
      const cacheKey = `${search.search}-${search.skip}-${search.limit}`;
      await this.cacheManager.set(cacheKey, searchResult);
      res.status(HttpStatus.OK).send(searchResult);
    }
  }
}
