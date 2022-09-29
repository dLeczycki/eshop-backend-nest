import { Test } from '@nestjs/testing';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { SaveOptions, RemoveOptions } from 'typeorm';
import { FindAllProductsResponse } from '../types';
import { DEFAULT_PRODUCT_SKIP, DEFAULT_PRODUCT_TAKE } from '../utils/constants';

describe('ProductController', () => {
  let productService: ProductService;
  let productController: ProductController;
  let firstMockProduct: Product;
  let secondMockProduct: Product;
  let mockProductsArray: Product[];

  beforeEach(async () => {
    const productModule = await Test.createTestingModule({
      imports: [
        AutomapperModule.forRoot({
          strategyInitializer: classes(),
        }),
      ],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    productService = productModule.get<ProductService>(ProductService);
    productController = productModule.get<ProductController>(ProductController);
  });

  beforeEach(() => {
    const entityHasIdMock = function (): boolean {
      throw new Error('Function not implemented.');
    };

    const entitySaveMock = function (options?: SaveOptions): Promise<Product> {
      throw new Error('Function not implemented.');
    };

    const entityRemoveMock = function (
      options?: RemoveOptions,
    ): Promise<Product> {
      throw new Error('Function not implemented.');
    };

    const entitySoftRemoveMock = function (
      options?: SaveOptions,
    ): Promise<Product> {
      throw new Error('Function not implemented.');
    };

    const entitySoftRecoverMock = function (
      options?: SaveOptions,
    ): Promise<Product> {
      throw new Error('Function not implemented.');
    };

    const entityReloadMock = function (): Promise<void> {
      throw new Error('Function not implemented.');
    };

    firstMockProduct = {
      id: '657faa7c-38ba-4f33-bffc-2f20ea769dbe',
      name: 'Testowy produkt',
      description: 'keyword',
      price: 29.99,
      promotionPrice: null,
      isAvailable: true,
      createdAt: new Date('2022-09-09T09:01:41.043Z'),
      updatedAt: new Date('2022-09-20T11:38:36.000Z'),
      images: [],
      hasId: entityHasIdMock,
      save: entitySaveMock,
      remove: entityRemoveMock,
      softRemove: entitySoftRemoveMock,
      recover: entitySoftRecoverMock,
      reload: entityReloadMock,
    };

    secondMockProduct = {
      id: '657faa7c-38ba-4f33-bffc-2f20ea769dbe',
      name: 'Testowy produkt',
      description: 'Update opisu1',
      price: 29.99,
      promotionPrice: null,
      isAvailable: true,
      createdAt: new Date('2022-09-09T09:01:41.043Z'),
      updatedAt: new Date('2022-09-20T11:38:36.000Z'),
      images: [],
      hasId: entityHasIdMock,
      save: entitySaveMock,
      remove: entityRemoveMock,
      softRemove: entitySoftRemoveMock,
      recover: entitySoftRecoverMock,
      reload: entityReloadMock,
    };

    mockProductsArray = [firstMockProduct, secondMockProduct, firstMockProduct];
  });

  describe('findAll', () => {
    let response: FindAllProductsResponse;
    let take = DEFAULT_PRODUCT_TAKE;
    let skip = DEFAULT_PRODUCT_SKIP;
    let keyword = '';

    it('should return an array of products', async () => {
      response = {
        products: mockProductsArray,
        total: mockProductsArray.length,
      };
      jest.spyOn(productService, 'findAll').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            return resolve(response);
          }),
      );

      expect(productController.findAll(take, skip, keyword)).resolves.toBe(
        response,
      );
    });

    it('should return appropriate number of products awith given take', async () => {
      take = 2;
      skip = 0;
      response = {
        products: mockProductsArray.slice(0, take),
        total: take,
      };

      jest.spyOn(productService, 'findAll').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            return resolve(response);
          }),
      );

      expect(productController.findAll(take, skip, keyword)).resolves.toBe(
        response,
      );
    });

    it('should return products containing keyword in name or description', async () => {
      take = 2;
      skip = 0;
      keyword = 'keyword';
      response = {
        products: mockProductsArray.filter(
          (product) =>
            product.name.includes(keyword) ||
            product.description.includes(keyword),
        ),
        total: take,
      };

      jest.spyOn(productService, 'findAll').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            return resolve(response);
          }),
      );

      expect(productController.findAll(take, skip, keyword)).resolves.toBe(
        response,
      );
    });
  });
});
