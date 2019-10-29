import { Component, OnInit } from '@angular/core';
import { BoardgameService } from 'src/app/shared/boardgame.service';
import { Boardgame } from 'src/app/shared/boardgame.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-boardgame-list',
  templateUrl: './boardgame-list.component.html',
  styleUrls: ['./boardgame-list.component.css']
})
export class BoardgameListComponent implements OnInit {

  list: Boardgame[];

  constructor(private service: BoardgameService,
              private firestore: AngularFirestore,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getBoardgames().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Boardgame;
      });
    });
  }

  onEdit(boardGame: Boardgame) {
    this.service.formData = Object.assign({}, boardGame);
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.firestore.doc('boardgames/' + id).delete();
      this.toastr.warning('Delete successfully');
    }
  }

}
