import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/services/google.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  public cities: string[] = ['London', 'Warsaw', 'Madrid'];
  public currentCity: string = '';
  public toggleState: string = 'choose'; //search
  public invalidInput: boolean = false;
  searchForm!: FormGroup;

  constructor(
    private google: GoogleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  get searchInput() {
    return this.searchForm.get('searchInput');
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchInput: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }
  parseData() {
    this.invalidInput = false;
    var city: string;

    if (this.currentCity != '' && this.toggleState == 'choose') {
      city = this.currentCity;
      this.google.parseData(city);
      this.router.navigate(['city']);
    } else if (this.toggleState == 'search') {
      city = (document.getElementById('address') as HTMLInputElement).value;
      this.google.parseData(city);

      this.google.searchCityResponse.subscribe((response) => {
        if (response == true) {
          this.router.navigate(['city']);
        } else {
          this.invalidInput = true;
        }
        this.searchForm.controls['searchInput'].setValue('');
      });
    }
  }
}
