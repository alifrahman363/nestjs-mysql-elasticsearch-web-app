// product.controller.ts

import { Controller, Get, Req, Res, Param, Post, Body, Put, Delete, NotFoundException } from "@nestjs/common";
import { Request, Response } from "express";
import { notFound, success, requestInvalid } from "src/helpers/http";
import { SUCCESS, REQUEST_ERROR } from "src/shared/constants/httpCodes";
import { handleInternalError } from "src/shared/error/handleInternalError";
import { ProductDto } from "./products.dto";
import { ProductService } from "./products.service";
import { MyElasticsearchService } from "src/elasticsearch/elasticsearch.service";

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly elasticsearchService: MyElasticsearchService,) { }

    @Get()
    async findAll(
        @Req() request: Request,
        @Res() response: Response
    ) {
        try {
            const data: any = await this.productService.findAll();

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            handleInternalError(error, response);
        }
    }

    @Get(':id')
    async findOne(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: number
    ) {
        try {
            const data: any = await this.productService.findById(id);

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Post('create')
    async create(
        @Req() request: Request,
        @Res() response: Response,
        @Body() productDto: ProductDto
    ) {
        try {
            const data: any = await this.productService.create(productDto);

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Post('createBulkAndIndex')
    async createBulkAndIndex(
        @Req() request: Request,
        @Res() response: Response,
        @Body() products: ProductDto[]
    ) {
        try {
            const data: any = await this.productService.createBulkAndIndex(products);

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            console.log(error);
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Get('search/:name')
    async searchByName(
        @Req() request: Request,
        @Res() response: Response,
        @Param('name') name: string
    ) {
        try {
            const data: any = await this.productService.searchByName(name);

            if (data && data.length > 0) {
                return response.status(SUCCESS).json(success(data));
            } else {
                return response.status(SUCCESS).json({ message: 'No products found for the given search criteria.' });
            }
        } catch (error) {
            console.log(error);
            handleInternalError(error, response);
        }
    }

    @Put('update-elasticsearch/:id')
    async updateElasticsearch(
        @Param('id') id: number,
        @Body() productDto: ProductDto,
        @Res() response: Response,
    ) {
        try {
            const updatedProduct = await this.productService.update(id, productDto);

            // Update the corresponding document in Elasticsearch
            await this.elasticsearchService.updateProduct({
                id: updatedProduct[0].id,
                name: updatedProduct[0].name,
                description: updatedProduct[0].description,
                price: updatedProduct[0].price,
            });

            return response.json({ message: 'Product and Elasticsearch index updated successfully.' });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ error: 'Product not found.' });
            } else {
                return response.status(500).json({ error: 'Internal server error.' });
            }
        }
    }

    @Delete('delete-elasticsearch/:id')
    async deleteProduct(
        @Param('id') id: number,
        @Res() response: Response,
    ) {
        try {
            // Delete the product in the database
            await this.productService.remove(id);

            // Delete the corresponding document in Elasticsearch
            await this.elasticsearchService.deleteProduct(id);

            return response.json({ message: 'Product and Elasticsearch index deleted successfully.' });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return response.status(404).json({ error: 'Product not found.' });
            } else {
                return response.status(500).json({ error: 'Internal server error.' });
            }
        }
    }

    @Put('update/:id')
    async update(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: number,
        @Body() productDto: ProductDto,
    ) {
        try {
            const data = await this.productService.update(id, productDto);

            return response.status(SUCCESS).json(success(data));
        } catch (error) {
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

    @Delete('delete/:id')
    async remove(
        @Req() request: Request,
        @Res() response: Response,
        @Param('id') id: number
    ) {
        try {
            await this.productService.remove(id);

            return response.status(SUCCESS).json(success({ message: 'Product deleted successfully' }));
        } catch (error) {
            return response.status(REQUEST_ERROR).json(requestInvalid(error));
        }
    }

}
