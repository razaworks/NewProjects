import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OsduesPage } from './osdues.page';

describe('OsduesPage', () => {
  let component: OsduesPage;
  let fixture: ComponentFixture<OsduesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsduesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OsduesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
