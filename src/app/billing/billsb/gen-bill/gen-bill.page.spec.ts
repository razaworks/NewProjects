import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenBillPage } from './gen-bill.page';

describe('GenBillPage', () => {
  let component: GenBillPage;
  let fixture: ComponentFixture<GenBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenBillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
