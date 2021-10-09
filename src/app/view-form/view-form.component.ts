import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';

@Component({
  selector: 'app-view-form',
  templateUrl: './view-form.component.html',
  styleUrls: ['./view-form.component.css'],
})
export class ViewFormComponent implements OnInit {
  constructor(private formService: FormService) {}

  formData: any;

  ngOnInit(): void {
    this.formService.getFormData().subscribe((data: any) => {
      this.formData = data;
      console.log(data);
    });
  }
}
