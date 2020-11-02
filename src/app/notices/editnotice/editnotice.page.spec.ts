import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditnoticePage } from './editnotice.page';

describe('EditnoticePage', () => {
  let component: EditnoticePage;
  let fixture: ComponentFixture<EditnoticePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditnoticePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditnoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
