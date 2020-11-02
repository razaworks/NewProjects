import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewdocPage } from './viewdoc.page';

describe('ViewdocPage', () => {
  let component: ViewdocPage;
  let fixture: ComponentFixture<ViewdocPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdocPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewdocPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
