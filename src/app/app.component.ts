import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbitService } from './core/services/flowbit/flowbit.service';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { NgxSpinnerModule } from "ngx-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private flowbiteService: FlowbitService) {}

  title = 'socialApp';
  
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}

