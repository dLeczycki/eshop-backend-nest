import { Test } from '@nestjs/testing';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { FindAllProductsResponse } from '../types';
import { DEFAULT_PRODUCT_SKIP, DEFAULT_PRODUCT_TAKE } from '../utils/constants';
import { CreateProductDto } from './dto/create-product.dto';
import {
  BAD_REQUEST_EXCEPTION_RESPONSE,
  NOT_FOUND_EXCEPTION_RESPONSE,
} from '../utils/http-exception-responses';
import { UpdateProductDto } from './dto/update-product.dto';

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

  beforeAll(() => {
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
      hasId: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      softRemove: jest.fn(),
      recover: jest.fn(),
      reload: jest.fn(),
    };

    secondMockProduct = {
      id: '657faa7c-38ba-4f33-bffc-2f20ea769dbe',
      name: 'Test product',
      description: 'Short test product description',
      price: 30.99,
      promotionPrice: null,
      isAvailable: true,
      createdAt: new Date('2022-09-09T09:01:41.043Z'),
      updatedAt: new Date('2022-09-20T11:38:36.000Z'),
      images: [],
      hasId: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      softRemove: jest.fn(),
      recover: jest.fn(),
      reload: jest.fn(),
    };

    mockProductsArray = [firstMockProduct, secondMockProduct, firstMockProduct];
  });

  describe('GET /products', () => {
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

  describe('GET /products/:id', () => {
    it('should return product with given id', async () => {
      jest.spyOn(productService, 'findOne').mockImplementation(
        (id) =>
          new Promise((resolve, reject) => {
            return resolve(firstMockProduct);
          }),
      );

      expect(productController.findOne(firstMockProduct.id)).resolves.toBe(
        firstMockProduct,
      );
    });

    it('should return 404 when product with given id is not found', async () => {
      jest.spyOn(productService, 'findOne').mockImplementation(
        (id) =>
          new Promise((resolve, reject) => {
            return reject(NOT_FOUND_EXCEPTION_RESPONSE);
          }),
      );

      expect(productController.findOne('wrong-id')).rejects.toBe(
        NOT_FOUND_EXCEPTION_RESPONSE,
      );
    });
  });

  describe('POST /products', () => {
    it('should return product entity', () => {
      const mockRequestData: CreateProductDto = {
        name: 'Test product',
        price: 30.99,
        description: 'Short test product description',
      };
      jest.spyOn(productService, 'create').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            return resolve(secondMockProduct);
          }),
      );

      expect(productController.create(mockRequestData)).resolves.toBe(
        secondMockProduct,
      );
    });

    it('should return status 400 and message when name is not defined', () => {
      const mockRequestData: Omit<CreateProductDto, 'name'> = {
        price: 30.99,
        description: 'Short test product description',
      };

      jest.spyOn(productService, 'create').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            return reject(NOT_FOUND_EXCEPTION_RESPONSE);
          }),
      );

      expect(
        productController.create(mockRequestData as CreateProductDto),
      ).rejects.toBe(NOT_FOUND_EXCEPTION_RESPONSE);
    });

    it('should return status 400 and message when price is not defined', () => {
      const mockRequestData: Omit<CreateProductDto, 'price'> = {
        name: 'Test product',
        description: 'Short test product description',
      };

      jest.spyOn(productService, 'create').mockImplementation(
        () =>
          new Promise((resolve, reject) => {
            return reject(NOT_FOUND_EXCEPTION_RESPONSE);
          }),
      );

      expect(
        productController.create(mockRequestData as CreateProductDto),
      ).rejects.toBe(NOT_FOUND_EXCEPTION_RESPONSE);
    });
  });

  describe('PATCH /products/:id', () => {
    let toUpdate: UpdateProductDto = {
      description: 'Description update',
    };

    const updatedObject: Product = {
      ...firstMockProduct,
      description: toUpdate.description,
      hasId: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
      softRemove: jest.fn(),
      recover: jest.fn(),
      reload: jest.fn(),
    };

    it('should return product with updated data', async () => {
      jest.spyOn(productService, 'update').mockImplementation(
        (id, objToUpdate) =>
          new Promise((resolve, reject) => {
            return resolve(updatedObject);
          }),
      );

      expect(
        productController.update(firstMockProduct.id, toUpdate),
      ).resolves.toBe(updatedObject);
    });

    it('should return 404 error when product with gicen id is not found', () => {
      jest.spyOn(productService, 'update').mockImplementation(
        (id, objToUpdate) =>
          new Promise((resolve, reject) => {
            return reject(NOT_FOUND_EXCEPTION_RESPONSE);
          }),
      );

      expect(productController.update('wrong-id', toUpdate)).rejects.toBe(
        NOT_FOUND_EXCEPTION_RESPONSE,
      );
    });

    it('should return 400 error when wrong input value is provided', () => {
      toUpdate = {
        ...toUpdate,
        dummy: 'dummy-value',
      } as unknown as UpdateProductDto;

      jest.spyOn(productService, 'update').mockImplementation(
        (id, objToUpdate) =>
          new Promise((resolve, reject) => {
            return reject(BAD_REQUEST_EXCEPTION_RESPONSE);
          }),
      );

      expect(
        productController.update(firstMockProduct.id, toUpdate),
      ).rejects.toBe(BAD_REQUEST_EXCEPTION_RESPONSE);
    });
  });

  describe('DELETE /products/:id', () => {
    it('should return empty response when product is deleted', () => {
      jest
        .spyOn(productService, 'remove')
        .mockImplementation(
          (id) => new Promise((resolve, reject) => resolve()),
        );

      expect(productController.remove(firstMockProduct.id)).resolves;
    });

    it('should return 404 when product is not found', () => {
      jest.spyOn(productService, 'remove').mockImplementation(
        (id) =>
          new Promise((resolve, reject) => {
            return reject(NOT_FOUND_EXCEPTION_RESPONSE);
          }),
      );

      expect(productController.remove(firstMockProduct.id)).rejects.toBe(
        NOT_FOUND_EXCEPTION_RESPONSE,
      );
    });
  });
});
