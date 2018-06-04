import {Component, OnDestroy, OnInit, AfterViewInit, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material';
import {SimpleDialogComponent} from '../../shared/simple-dialog/simple-dialog.component';
import {UserService} from '../user.service';
import {User} from '../user.model';
import {CountryService} from '../country/country.service';
import {Country} from '../country/country.model';
import {CityService} from '../city/city.service';
import {City} from '../city/city.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
})
export class UserCreateComponent implements OnInit, OnDestroy {

  public userForm: FormGroup;
  public countries: Country[];
  public cities: City[];
  public title: string;
  public birthDateErrorMessage: string;

//  private id: number;
  private user: User = this.data.user;

//  private subscription: any;
  private simpleDialogRef: MatDialogRef<SimpleDialogComponent>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private simpleDialog: MatDialog,
    public dialogRef: MatDialogRef<UserCreateComponent>,
    private userService: UserService,
    private countryService: CountryService,
    private cityService: CityService,
    @Inject(MAT_DIALOG_DATA) private data: any) {}

  ngOnInit() {
//    this.subscription = this.route.params.subscribe(params => {
//      this.id = params['id'];
//    });

    console.log('User: ', this.user);
    this.title = (this.user.id) ? 'Update user ' + this.user.id : 'Create new user';

    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
        Validators.email
      ]),
      birthDate: new FormControl(),
      salary: new FormControl('', Validators.min(50)),
      gender: new FormControl(),
      married: new FormControl(),
      country: new FormControl('', Validators.required),
      city: new FormControl(),
    });

    this.getAllCountries();

    this.userForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: (this.user.birthDate) ? new Date(this.user.birthDate) : null,
      salary: this.user.salary,
      gender: this.user.gender,
      married: this.user.married,
      country: this.user.country,
      city: this.user.city,
    });

    this.initCity();

//    // edit form
//    console.log(this.user.id);
//    if (this.user.id) {
//      this.userService.findById(this.user.id).subscribe(
//         this.userService.findById(this.id).then(
//        user => {
//         this.id = user.id;
//
//          this.userForm.patchValue({
//            firstName: user.firstName,
//            lastName: user.lastName,
//            email: user.email,
//            birthDate: (user.birthDate) ? new Date(user.birthDate) : null,
//            salary: user.salary,
//            gender: user.gender,
//            married: user.married,
//            country: user.country,
//            city: user.city,
//          });
//
//          this.initCity();
//        }, error => {
//          this.errorHandler(error);
//        }
//      );
//
//    // Create form
//    } else {
//      this.userForm.patchValue({
//        country: null,
//        city: null,
//      });
//    }

  }

  ngOnDestroy(): void {
//    console.log('ngOnDestroy');
//    this.subscription.unsubscribe();
//    console.log('ngOnDestroy end');
  }

  onSubmit() {
    this.submit();
  }

  submit() {
    if (this.userForm.valid) {

      const marriedValue = this.userForm.controls['married'].value === null ? false : this.userForm.controls['married'].value;
      let genderValue = this.userForm.controls['gender'].value;
      // Reset gender is married is not checked
      if (!marriedValue) {
        genderValue = null;
      }

      // this.id
      const user: User = new User(this.user.id,
        this.userForm.controls['firstName'].value,
        this.userForm.controls['lastName'].value,
        this.userForm.controls['email'].value,
        this.userForm.controls['birthDate'].value,
        this.userForm.controls['salary'].value,
        genderValue,
        marriedValue,
        this.userForm.controls['country'].value,
        this.userForm.controls['city'].value,
      );

      if (this.user.id) {
        console.log('Updating user');
        // this.userService.updateUser(user).then();
        this.userService.update(user.id, user).subscribe(
          res => {
//            console.log('Update done');
            this.close(1);
//            this.redirectUserPage();
          },
          error => {
            this.errorHandler(error);
          }
        );

      } else {
        console.log('Creating user');
        // this.userService.saveUser(user).then();
        this.userService.save(user).subscribe(
          (res) => {
//            console.log('Create done');
            this.close(1);
//            this.redirectUserPage();
          },
          error => {
            this.errorHandler(error);
          }
        );
      }
    }
  }

  getAllCountries() {
    console.log('Get all Countries');
    this.countryService.findAll().subscribe(
      countries => {
        this.countries = countries;
      },
      err => {
        this.errorHandler(err);
      });
  }

  getAllCitiesByCountryId(countryId: number) {
    console.log('Get all cities by country id: ', countryId);
    this.cityService.findAllByCountryId(countryId).subscribe(
      cities => {
        this.cities = cities;
      },
      err => {
        this.errorHandler(err);
      });
  }

  compareCountryByIds(c1: Country, c2: Country): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  compareCityByIds(c1: City, c2: City): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  initCity() {
    const newCountry = this.userForm.controls['country'].value;
    console.log('Country selected: ', newCountry);
    if (newCountry) {
     this.getAllCitiesByCountryId(newCountry.id);
    } else {
      this.cities = null;
    }
  }

  onCountryChange() {
    this.initCity();
    this.userForm.patchValue({
      city: null,
    });
  }

//  redirectUserPage() {
//    this.router.navigate(['/user']);
//  }

  onNoClick(): void {
    this.close(0);
  }

  close(result: number): void {
    this.userForm.reset();
    this.dialogRef.close(result);
  }

  errorHandler(e: any): void {

    this.simpleDialogRef = this.simpleDialog.open(SimpleDialogComponent, {
      disableClose: false,
    });
    this.simpleDialogRef.componentInstance.title = 'Error';

    console.log('Error : ', e);

    if (e.status === 0) {
      const messages = new Array();
      messages.push('Cannot connect to server');
      this.simpleDialogRef.componentInstance.messages = messages;
    } else if (e.error.errorMessages === undefined || e.error.errorMessages === null) {
      const messages = new Array();
      messages.push('An unexpected error occured');
      this.simpleDialogRef.componentInstance.messages = messages;
    } else {
      this.simpleDialogRef.componentInstance.messages = e.error.errorMessages;
    }
  }

}
