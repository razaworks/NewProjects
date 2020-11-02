import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NdetailPage } from './ndetail.page';

describe('NdetailPage', () => {
  let component: NdetailPage;
  let fixture: ComponentFixture<NdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NdetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
