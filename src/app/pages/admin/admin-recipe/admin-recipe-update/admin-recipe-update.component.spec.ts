import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipeUpdateComponent } from './admin-recipe-update.component';

describe('AdminRecipeUpdateComponent', () => {
  let component: AdminRecipeUpdateComponent;
  let fixture: ComponentFixture<AdminRecipeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecipeUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecipeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
