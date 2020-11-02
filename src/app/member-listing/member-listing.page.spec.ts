import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberListingPage } from './member-listing.page';

describe('MemberListingPage', () => {
  let component: MemberListingPage;
  let fixture: ComponentFixture<MemberListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
