import { Component, OnInit } from '@angular/core';
import { BoardgameService } from 'src/app/shared/boardgame.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boardgame',
  templateUrl: './boardgame.component.html',
  styleUrls: ['./boardgame.component.css']
})
export class BoardgameComponent implements OnInit {

  constructor(private service: BoardgameService,
              private firestore: AngularFirestore,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
    this.service.formData = {
      id: null,
      name: '',
      description: '',
      imageUrl: ''
    };
  }

  onSubmit(form: NgForm) {
    const data = Object.assign({}, form.value);
    delete data.id;
    if (form.value.id == null) {
      this.firestore.collection('boardgames').add(data);
    } else {
      this.firestore.doc('boardgames/' + form.value.id).update(data);
    }
    this.resetForm(form);
    this.toastr.success('Submitted successfully');
  }

}
