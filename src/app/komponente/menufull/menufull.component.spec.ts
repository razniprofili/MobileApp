import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MenufullComponent } from './menufull.component';

describe('MenufullComponent', () => {
  let component: MenufullComponent;
  let fixture: ComponentFixture<MenufullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenufullComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MenufullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
