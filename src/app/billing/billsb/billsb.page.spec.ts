import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BillsbPage } from './billsb.page';

describe('BillsbPage', () => {
  let component: BillsbPage;
  let fixture: ComponentFixture<BillsbPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsbPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BillsbPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
