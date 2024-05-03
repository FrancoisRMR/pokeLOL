import { Component } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router, RouterOutlet } from '@angular/router';
import { SearchBarComponent } from './search-bar/component/search-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SearchBarComponent, FlexLayoutModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pokeLOL';

  constructor(private router: Router) {}

  redirectTo() {
    this.router.navigate(['/']);
  }
}
