import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { MyElasticsearchService } from './elasticsearch.service';
import { BatchIndexingService } from './batch-indexing.service';
@Module({
    imports: [
        ElasticsearchModule.register({
            node: 'http://localhost:9200',
        }),
    ],
    providers: [MyElasticsearchService, BatchIndexingService],
    exports: [ElasticsearchModule, BatchIndexingService],
})
export class elasticsearchModule { }
