import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MovieModalComponent } from './movie-modal.component';

describe('MovieModalComponent', () => {
  let component: MovieModalComponent;
  let fixture: ComponentFixture<MovieModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
