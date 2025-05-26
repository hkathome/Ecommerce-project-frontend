import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMasterDetailViewComponent } from './product-master-detail-view.component';

describe('ProductMasterDetailViewComponent', () => {
  let component: ProductMasterDetailViewComponent;
  let fixture: ComponentFixture<ProductMasterDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMasterDetailViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMasterDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
