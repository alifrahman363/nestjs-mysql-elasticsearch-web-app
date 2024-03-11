// batch-indexing.service.ts

import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Product } from 'src/modules/products/products.entity';

@Injectable()
export class BatchIndexingService {
    constructor(private readonly elasticsearchService: ElasticsearchService) { }

    async indexProducts(products: Product[]): Promise<void> {
        const body = products.flatMap((product) => [
            { index: { _index: 'products', _id: product.id.toString() } },
            product,
        ]);

        await this.elasticsearchService.bulk({
            body,
        });
    }
}


// [
//     { "name": "Apple", "description": "A sweet and crunchy fruit.", "price": 1.99 },
//     { "name": "Broccoli", "description": "A nutritious green vegetable.", "price": 2.49 },
//     { "name": "Orange", "description": "A citrus fruit with a tangy taste.", "price": 1.79 },
//     { "name": "Banana", "description": "A tropical and energy-boosting fruit.", "price": 1.29 },
//     { "name": "Carrot", "description": "A crunchy and orange vegetable.", "price": 0.99 },
//     { "name": "Grapes", "description": "Small, sweet, and juicy berries.", "price": 3.99 },
//     { "name": "Spinach", "description": "A leafy green with high nutritional value.", "price": 2.99 },
//     { "name": "Pear", "description": "A sweet and juicy fruit with a grainy texture.", "price": 2.19 },
//     { "name": "Cucumber", "description": "Cool and refreshing green vegetable.", "price": 1.49 },
//     { "name": "Strawberry", "description": "Red, juicy, and delicious berries.", "price": 4.49 },
//     { "name": "Tomato", "description": "Red and versatile fruit often used as a vegetable.", "price": 1.69 },
//     { "name": "Kiwi", "description": "Small, brown, and fuzzy fruit with a green interior.", "price": 2.79 },
//     { "name": "Lettuce", "description": "Crunchy and leafy green for salads.", "price": 1.29 },
//     { "name": "Mango", "description": "Tropical fruit with a sweet and tangy flavor.", "price": 3.99 },
//     { "name": "Bell Pepper", "description": "Colorful and crunchy vegetable.", "price": 2.99 },
//     { "name": "Peach", "description": "Soft and fuzzy fruit with a sweet taste.", "price": 2.49 },
//     { "name": "Celery", "description": "Crunchy and low-calorie vegetable.", "price": 1.79 },
//     { "name": "Blueberry", "description": "Small, round, and sweet berries.", "price": 5.99 },
//     { "name": "Cabbage", "description": "Leafy green or purple vegetable.", "price": 1.99 },
//     { "name": "Watermelon", "description": "Juicy and refreshing summer fruit.", "price": 3.49 },
//     { "name": "Potato", "description": "Versatile starchy vegetable.", "price": 0.89 },
//     { "name": "Raspberry", "description": "Sweet and tart berries.", "price": 4.29 },
//     { "name": "Pineapple", "description": "Tropical and tangy fruit.", "price": 3.79 },
//     { "name": "Zucchini", "description": "Mild-flavored summer squash.", "price": 2.19 },
//     { "name": "Cherry", "description": "Small and sweet red or black fruit.", "price": 6.99 },
//     { "name": "Asparagus", "description": "Tender green vegetable.", "price": 2.59 },
//     { "name": "Cantaloupe", "description": "Sweet and aromatic melon.", "price": 3.99 },
//     { "name": "Sweet Potato", "description": "Nutritious and sweet root vegetable.", "price": 1.69 },
//     { "name": "Blackberry", "description": "Dark and juicy berries.", "price": 4.79 },
//     { "name": "Radish", "description": "Crunchy and peppery root vegetable.", "price": 1.29 },
//     { "name": "Avocado", "description": "Creamy and nutrient-rich fruit.", "price": 2.99 },
//     { "name": "Pomegranate", "description": "Seedy and tart fruit.", "price": 5.49 },
//     { "name": "Eggplant", "description": "Purple and versatile vegetable.", "price": 2.39 },
//     { "name": "Plum", "description": "Sweet and juicy stone fruit.", "price": 2.89 },
//     { "name": "Artichoke", "description": "Edible flower bud with a nutty flavor.", "price": 3.29 },
//     { "name": "Apricot", "description": "Small and sweet orange fruit.", "price": 3.19 },
//     { "name": "Brussels Sprouts", "description": "Miniature cabbage-like vegetable.", "price": 2.79 },
//     { "name": "Cranberry", "description": "Small, red, and tart berries.", "price": 4.99 },
//     { "name": "Butternut Squash", "description": "Sweet and nutty winter squash.", "price": 2.99 },
//     { "name": "Cauliflower", "description": "Versatile and nutritious vegetable.", "price": 1.99 },
//     { "name": "Grapefruit", "description": "Citrus fruit with a bitter-sweet taste.", "price": 1.59 },
//     { "name": "Mushroom", "description": "Fungi with a unique texture and flavor.", "price": 3.49 },
//     { "name": "Beet", "description": "Sweet and earthy root vegetable.", "price": 2.09 },
//     { "name": "Nectarine", "description": "Juicy and smooth-skinned stone fruit.", "price": 2.69 },
//     { "name": "Turnip", "description": "Root vegetable with a peppery flavor.", "price": 1.39 },
//     { "name": "Clementine", "description": "Small and sweet citrus fruit.", "price": 3.69 },
//     { "name": "Kale", "description": "Nutrient-dense and leafy green.", "price": 2.19 },
//     { "name": "Persimmon", "description": "Sweet and flavorful orange fruit.", "price": 4.19 },
//     { "name": "Radish", "description": "Crunchy and peppery root vegetable.", "price": 1.29 },
//     { "name": "Papaya", "description": "Tropical fruit with orange flesh.", "price": 3.79 }
//   ]