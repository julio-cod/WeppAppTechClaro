import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent implements OnInit {
  public respuesta:any = [];
  public form!: FormGroup;
  public previsualizacion: string = "./assets/sin_imagen.jpg";
  public loading: boolean = false;
  
  constructor(private route:ActivatedRoute,private bookService:BookService,private formBuilder: FormBuilder,private toastr:ToastrService) { }
  Id= '';
  Title= '';
  Description= '';
  PageCount= '';
  Excerpt= '';
  PublishDate= '';
  
  ngOnInit(): void {
    this.route.paramMap.subscribe( (paraMap:any) => {
      const {params} = paraMap
      this.buscarBook(params.idBook);
    })

        this.form = this.formBuilder.group({
          txtId: ['',[Validators.required]],
      txtTitle: ['',[Validators.required]],
      txtDescription: ['',[Validators.required]],
      txtPageCount: ['',[Validators.required]],
      txtExcerpt: ['',[Validators.required]],
      txtPublishDate: ['',[Validators.required]]
        });
  }

  buscarBook(id:string){
    this.bookService.findBook('/api/Books/'+id).subscribe(data => {
      this.Id= (data as any).id;
      this.Title= (data as any).title;
      this.Description= (data as any).description;
      this.PageCount= (data as any).pageCount;
      this.Excerpt= (data as any).excerpt;
      this.PublishDate= (data as any).publishDate;
      
    });
    
  }

  public enviarData(){
    this.bookService.editBook('/api/Books/' + this.Id,
    {
      id: Number(this.Id),
      title: ""+this.Title+"",
      description: ""+this.Description+"",
      pageCount: Number(this.PageCount),
      excerpt: ""+this.Excerpt+"",
      publishDate: ""+this.PublishDate+""
      
    }).subscribe(respuesta => {
      this.loading = false;
      console.log('Respuesta del servidor', respuesta);
      this.respuesta = respuesta;
      console.log('this.respuesta.Success: ', this.respuesta.success);

      if(this.respuesta == 200){
        console.log('Libro modificado!');
        this.ShowToastrExito();
      }
      else{
        console.log('Error al modificar libro');
        this.ShowToastrError(respuesta);
      }
    })
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
