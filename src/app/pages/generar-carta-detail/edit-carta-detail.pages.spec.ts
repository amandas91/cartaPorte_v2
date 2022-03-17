import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCartaDetailPages } from './edit-carta-detail.pages';

describe('EditCartaDetailPages', () => {
  let component: EditCartaDetailPages;
  let fixture: ComponentFixture<EditCartaDetailPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCartaDetailPages ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCartaDetailPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
