import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../_services/account.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter<boolean>();
  model: any ={}
  registerError: string = '';

  constructor(private accountService:AccountService,
    ){}
  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: () =>{
       
        this.cancel();
      },
      error: (error) => {
        console.log(error);
        this.registerError = 'Incorrect Email or Password. Please try again.';
        setTimeout(() => {
          this.registerError = '';
        }, 5000); // hide error after 5 seconds
      },
    })
  }
  cancel(){
    console.log("Cancelled")
    this.cancelRegister.emit(false);
  }
}
