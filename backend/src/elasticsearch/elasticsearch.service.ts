// elasticsearch.service.ts

import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class MyElasticsearchService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async indexProduct(product: { id: number; name: string; description: string }) {
        await this.elasticsearchService.index({
            index: 'products',
            body: product,
            id: product.id.toString(),
        });
    }

    async searchProducts(query: string) {
        const results = await this.elasticsearchService.search({
            index: 'products',
            body: {
                query: {
                    query_string: {
                        query: `*${query}*`, // You can customize the query as needed
                        fields: ['name', 'description'],
                    },
                },
            },
        });

        return results.hits.hits.map((hit) => hit._source);
    }

    async updateProduct(product: { id: number; name?: string; description?: string; price?: number }) {
        const { id, ...updatedFields } = product;

        const updateBody = {
            doc: updatedFields,
        };

        await this.elasticsearchService.update({
            index: 'products',
            id: id.toString(),
            body: updateBody,
        });
    }

    async deleteProduct(id: number) {
        await this.elasticsearchService.delete({
            index: 'products',
            id: id.toString(),
        });
    }

}
