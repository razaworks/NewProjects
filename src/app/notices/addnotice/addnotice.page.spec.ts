import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddnoticePage } from './addnotice.page';

describe('AddnoticePage', () => {
  let component: AddnoticePage;
  let fixture: ComponentFixture<AddnoticePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnoticePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddnoticePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
