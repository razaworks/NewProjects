import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditeventPage } from './editevent.page';

describe('EditeventPage', () => {
  let component: EditeventPage;
  let fixture: ComponentFixture<EditeventPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditeventPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditeventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
