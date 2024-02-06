import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductDetailsComponent } from './product-details.component';
import { ApiService } from '../../Services/Api.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  const mockProductData = {
    data: {
      id: 1,
      name: 'Product',
      price: 19.99,
      quantity: 10,
      imgURL: 'https://example.com/test-product.jpg'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } },
        { provide: ApiService, useValue: { GetProductByID: jasmine.createSpy('GetProductByID').and.returnValue(of(mockProductData)) } }
      ]
    });

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch product details after calling', () => {
    expect(TestBed.inject(ApiService).GetProductByID).toHaveBeenCalledWith('1');
    expect(component.list).toEqual(mockProductData.data);
  });
});