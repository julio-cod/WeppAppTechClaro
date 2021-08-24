import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-createbook',
  templateUrl: './createbook.component.html',
  styleUrls: ['./createbook.component.css']
})
export class CreatebookComponent implements OnInit {
  public respuesta:any = [];
  public form!: FormGroup;
  public previsualizacion: string = "./assets/sin_imagen.jpg";
  public loading: boolean = false;

  constructor(private bookService:BookService,private formBuilder: FormBuilder,private toastr:ToastrService) { }

  Id= '';
  Title= '';
  Description= '';
  PageCount= '';
  Excerpt= '';
  PublishDate= '';

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      txtId: ['',[Validators.required]],
      txtTitle: ['',[Validators.required]],
      txtDescription: ['',[Validators.required]],
      txtPageCount: ['',[Validators.required]],
      txtExcerpt: ['',[Validators.required]],
      txtPublishDate: ['',[Validators.required]]
});
  }

  public AgregarProducto(){
    
    try{
      this.loading = true;
    this.bookService.createBook('/api/Books',
    {
      id: Number(this.Id),
      title: ""+this.Title+"",
      description: ""+this.Description+"",
      pageCount: Number(this.PageCount),
      excerpt: ""+this.Excerpt+"",
      publishDate: ""+this.PublishDate+""
      
    })
    .subscribe(respuesta => {
      this.loading = false;
      console.log('Respuesta del servidor', respuesta);
      this.respuesta = respuesta;
      if(this.respuesta == 200){
        this.form.reset();
        this.ShowToastrExito();
        console.log('Libro guardado!');
      }
      else{
        this.ShowToastrError(this.respuesta);
        console.log('Error al guardar Libro');
      }
      
    },
    error => {
      console.log('Error de aplicacion', error),
      this.ShowToastrError();
      this.loading = false;
    })
    }
    
    catch(e){
      this.loading = false;
      console.log('Error ', e);
    }
    
  
    
  }

  onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  ShowToastrExito(){
    this.toastr.success("Libro Guardado!", "Exito!",{timeOut:1000});
  }
  ShowToastrError(tipoError?:any){
    this.toastr.error("Error al guardado Libro!", "Error! " + tipoError,{timeOut:1000});
  }

}
