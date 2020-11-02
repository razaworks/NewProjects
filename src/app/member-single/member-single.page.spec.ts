import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberSinglePage } from './member-single.page';

describe('MemberSinglePage', () => {
  let component: MemberSinglePage;
  let fixture: ComponentFixture<MemberSinglePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSinglePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberSinglePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
