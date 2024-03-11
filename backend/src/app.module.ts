// src/app.module.ts

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ProductModule } from './modules/products/products.module';
import { elasticsearchModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST || 'localhost',
    //   port: parseInt(process.env.DB_PORT, 10) || 3306,
    //   username: process.env.DB_USER || 'root',
    //   password: process.env.DB_PASSWORD || '',
    //   database: process.env.DB_NAME || 'elastic',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-elastic-search-1-alifrahman363-819f.a.aivencloud.com',
      port: 25940,
      username: 'avnadmin',
      password: 'AVNS_ycfhaNTXaB8DPK7FOyy', // Replace with the actual password
      database: 'defaultdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl: false, // Disable SSL verification
    }),
    ElasticsearchModule.register({
      node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
    }),
    elasticsearchModule,
    ProductModule,
  ],
})
export class AppModule { }

// # # DATABASE
// # DB_USERNAME=root
// # DB_PASSWORD=""
// # DB_ROOT_PASSWORD=root
// # DB_NAME=elastic
// # DB_PORT=3306
// # DB_DIALECT=mysql   
// # DB_HOST=localhost 

// # DATABASE
// DB_USERNAME=avnadmin
// DB_PASSWORD=AVNS_ycfhaNTXaB8DPK7FOyy
// DB_HOST=mysql-elastic-search-1-alifrahman363-819f.a.aivencloud.com
// DB_PORT=25940
// DB_NAME=defaultdb
// DB_DIALECT=mysql

// # ELASTICSEARCH
// ELASTICSEARCH_NODE=http://localhost:9200
// # Delete all elastic search indices 
// # curl -X DELETE "http://localhost:9200/_all" 
// # or
// # curl -X DELETE "localhost:9200/*"


// # connection string through sudo to access database hosted in aiven
// # mysql --host mysql-elastic-search-1-alifrahman363-819f.a.aivencloud.com --port 25940 --user avnadmin --password=AVNS_ycfhaNTXaB8DPK7FOyy defaultdb
// # SHOW DATABASES;
// # USE defaultdb;
// # SHOW TABLES;
// # DESC tblProduct;
// # SELECT * FROM tblProduct;
// # SELECT * FROM tblProduct WHERE id=1;
// # UPDATRE tblProduct SET name='new name' WHERE id=1;
// # DELETE FROM tblProduct WHERE id=1;
// # DELETE FROM tblProduct;