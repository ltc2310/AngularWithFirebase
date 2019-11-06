import { Component, OnInit } from '@angular/core';
import { BoardgameService } from 'src/app/shared/boardgame.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

export const imageUrlRegex = RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/);

export const defaultImageUrl = 'http://hstatic.net/363/1000016363/10/2016/5-11/boardgames.jpg';

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

  getImageUrl = (imageUrl: string) => {
    if (imageUrlRegex.test(imageUrl)) {
      return imageUrl;
    }
    return defaultImageUrl;
  }

  onSubmit(form: NgForm) {
    const normalizeImageUrl = this.getImageUrl(form.value.imageUrl);
    const data = { ...form.value, imageUrl: normalizeImageUrl };
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
