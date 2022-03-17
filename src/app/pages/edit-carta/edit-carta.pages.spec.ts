import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCartaPages } from 'app/pages/generar-carta-detail/edit-carta.pages';


describe('EditCartaPages', () => {
  let component: EditCartaPages;
  let fixture: ComponentFixture<EditCartaPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCartaPages ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCartaPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
