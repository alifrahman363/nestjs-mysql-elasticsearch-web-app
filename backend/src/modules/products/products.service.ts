import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./products.entity";
import { ProductDto } from "./products.dto";
import { MyElasticsearchService } from "src/elasticsearch/elasticsearch.service";
import { BatchIndexingService } from "src/elasticsearch/batch-indexing.service";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly elasticsearchService: MyElasticsearchService,
        private readonly batchIndexingService: BatchIndexingService
    ) { }

    async create(productDto: ProductDto): Promise<Product> {
        try {
            const product = this.productRepository.create(productDto);
            const savedProduct = await this.productRepository.save(product);

            // Index the product in Elasticsearch
            await this.elasticsearchService.indexProduct({
                id: savedProduct.id,
                name: savedProduct.name,
                description: savedProduct.description, // Include description
            });

            return savedProduct;
        } catch (error) {
            throw new NotFoundException('Product cannot be created. Please try again.');
        }
    }

    async createBulkAndIndex(productsDto: ProductDto[]): Promise<Product[]> {
        // Convert ProductDto to Product entities
        const products: Product[] = productsDto.map(productDto => {
            const product = new Product();
            product.name = productDto.name;
            product.description = productDto.description;
            product.price = productDto.price;
            return product;
        });

        // Save products in the database
        const savedProducts = await this.productRepository.save(products);

        // Index products in Elasticsearch
        await this.batchIndexingService.indexProducts(savedProducts);

        return savedProducts;
    }


    async searchByName(name: string) {
        try {
            const products = await this.elasticsearchService.searchProducts(name);
            return products;
        } catch (error) {
            throw new NotFoundException('Products not found');
        }
    }

    async findAll() {
        try {
            const products = await this.productRepository.find();
            if (products.length === 0) throw new NotFoundException('Products not found');

            return products;
        } catch (error) {
            throw new NotFoundException('Products not found');
        }
    }

    async findById(id: number) {
        try {
            const product = await this.productRepository.findBy({ id: id });
            if (!product) throw new NotFoundException('Product not found');

            return product;
        } catch (error) {
            throw new NotFoundException('Product not found');
        }
    }

    async update(id: number, productDto: ProductDto) {
        try {
            await this.productRepository.update(id, productDto);
            const updatedProduct = await this.productRepository.findBy({ id: id });
            if (!updatedProduct) throw new NotFoundException('Product not found');

            return updatedProduct;
        } catch (error) {
            throw new NotFoundException('Product cannot be updated. Please try again.');
        }
    }

    async remove(id: number) {
        try {
            const result = await this.productRepository.delete(id);
            if (result.affected === 0) throw new NotFoundException('Product not found');
        } catch (error) {
            throw new NotFoundException('Product cannot be deleted. Please try again.');
        }
    }
}
