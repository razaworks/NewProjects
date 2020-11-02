import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SocietyListingPage } from './society-listing.page';

describe('SocietyListingPage', () => {
  let component: SocietyListingPage;
  let fixture: ComponentFixture<SocietyListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocietyListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SocietyListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
