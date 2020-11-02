import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocRegPage } from './soc-reg.page';

describe('SocRegPage', () => {
  let component: SocRegPage;
  let fixture: ComponentFixture<SocRegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocRegPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
