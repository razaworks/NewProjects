import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddeventPage } from './addevent.page';

describe('AddeventPage', () => {
  let component: AddeventPage;
  let fixture: ComponentFixture<AddeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
