import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchBarService } from '../service/search-bar.service';

describe('SearchBarComponent', () => {
  let component: SearchBarService;
  let fixture: ComponentFixture<SearchBarService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarService],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
