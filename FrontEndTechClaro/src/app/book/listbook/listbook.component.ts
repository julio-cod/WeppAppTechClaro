import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-listbook',
  templateUrl: './listbook.component.html',
  styleUrls: ['./listbook.component.css']
})
export class ListbookComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Title', 'Description', 'PageCount','PublishDate', 'modificar', 'eliminar'];
  public dataSource:any = [];
  public form!: FormGroup;
  IdBook= '';
  constructor(private bookService:BookService,private formBuilder: FormBuilder,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      txtIdBook: ['']
  });

    this.cargarListBooks();
  }

  public cargarListBooks(){
    this.IdBook= '';
    this.bookService.listBooks('/api/Books')
      .subscribe(respuesta => {
        this.dataSource = respuesta
      })
    
  }

  public buscarBook(){
    if(this.IdBook != ''){
      this.bookService.findBook('/api/Books/' + this.IdBook)
      .subscribe(respuesta => {
        this.dataSource = [respuesta]
      })
    }
    else{
      this.ShowToastrError();
    }

  }

  onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

ShowToastrError(){
  this.toastr.error("Debe digitar el Id del Libro!", "Error!",{timeOut:1000});
}

}
