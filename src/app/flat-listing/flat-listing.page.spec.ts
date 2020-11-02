import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FlatListingPage } from './flat-listing.page';

describe('FlatListingPage', () => {
  let component: FlatListingPage;
  let fixture: ComponentFixture<FlatListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatListingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FlatListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
