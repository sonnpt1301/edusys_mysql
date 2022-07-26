import { CacheModule, Module } from '@nestjs/common';
import { CacheManagerService } from './cache-manager.service';

@Module({
  imports: [CacheModule.register()],
  providers: [CacheManagerService],
})
export class CacheManagerModule {}
