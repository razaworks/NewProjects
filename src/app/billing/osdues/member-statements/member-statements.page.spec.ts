import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberStatementsPage } from './member-statements.page';

describe('MemberStatementsPage', () => {
  let component: MemberStatementsPage;
  let fixture: ComponentFixture<MemberStatementsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberStatementsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberStatementsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
