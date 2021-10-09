import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css'],
})
export class FormsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private router: Router
  ) {}
  images = [] as any;
  projectDetailsForm = new FormGroup({
    organization: new FormControl(''),
    category: new FormControl(''),
    activity: new FormControl(''),
    title: new FormControl(''),
    minAge: new FormControl(''),
    maxAge: new FormControl(''),
    overviewDescription: new FormControl(''),
  });

  projectCoasts: any;
  galleryForm = new FormGroup({
    images: new FormControl([]),
    projectName: new FormControl(''),
  });
  projectCoast: any;
  projectInclude: any;
  projectIncludes: any;
  projectDate: any;
  projectDates: any;
  ngOnInit(): void {
    this.projectCoast = this.fb.group({
      projectCoasts: this.fb.array([this.newProductCoast()]),
      projectName: new FormControl(''),
    });

    this.projectInclude = this.fb.group({
      projectName: new FormControl(''),
      includes: this.fb.array([this.newProjectInclude()]),
    });

    this.projectDate = this.fb.group({
      projectName: new FormControl(''),
      dates: this.fb.array([this.newProjectDate()]),
    });
  }

  onFileSelect(event: any) {
    const element: any = event.target as HTMLInputElement;

    this.setImages(element.files);
    this.galleryForm.patchValue({
      images: element.files,
    });
    console.log(element.files);
  }

  newProjectInclude() {
    return new FormGroup({
      include: new FormControl('Not include'),
      description: new FormControl(''),
    });
  }

  newProjectDate() {
    return new FormGroup({
      date: new FormControl(),
    });
  }

  setImages(files: any) {
    {
      var filesAmount = files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.images.push(e.target.result);
        };

        reader.readAsDataURL(files[i]);
      }
    }
  }

  newProductCoast() {
    return new FormGroup({
      weeks: new FormControl(),
      coast: new FormControl(),
    });
  }

  addProductCoast() {
    this.projectCoasts = this.projectCoast.get('projectCoasts') as FormArray;
    this.projectCoasts.push(this.newProductCoast());
  }
  addProjectIncludes() {
    this.projectIncludes = this.projectInclude.get('includes') as FormArray;
    this.projectIncludes.push(this.newProjectInclude());
  }

  addProjectDate() {
    this.projectDates = this.projectDate.get('dates') as FormArray;
    this.projectDates.push(this.newProjectDate());
  }
  get productCoastControls() {
    return this.projectCoast.get('projectCoasts')['controls'];
  }
  get getProjectIncludesControls() {
    return this.projectInclude.get('includes')['controls'];
  }

  get getProjectDateControls() {
    return this.projectDate.get('dates')['controls'];
  }
  removeProductCoast(i: number) {
    this.projectCoasts.removeAt(i);
  }
  removeProjectControls(i: number) {
    this.projectIncludes.removeAt(i);
  }

  removeProjectDates(i: number) {
    this.projectDates.removeAt(i);
  }

  onSubmit() {
    let Obj = {} as any;
    Obj.projectDetails = this.projectDetailsForm.value;

    let gallery = this.galleryForm.value;

    gallery.images = this.images;

    Obj.gallery = gallery;
    Obj.projectCoast = this.projectCoast.value;
    Obj.projectInclude = this.projectInclude.value;
    Obj.projectDate = this.projectDate.value;
    this.formService.setFormData(Obj);
    this.router.navigateByUrl('/form-details');
  }
}
