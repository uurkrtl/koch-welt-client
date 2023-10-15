import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRecipeListComponent } from './admin-recipe-list.component';

describe('AdminRecipeListComponent', () => {
  let component: AdminRecipeListComponent;
  let fixture: ComponentFixture<AdminRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRecipeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
