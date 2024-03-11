// src/product/product.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { elasticsearchModule } from 'src/elasticsearch/elasticsearch.module';
import { MyElasticsearchService } from 'src/elasticsearch/elasticsearch.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product]), elasticsearchModule],
    providers: [ProductService, MyElasticsearchService],
    controllers: [ProductController],
})
export class ProductModule { }
