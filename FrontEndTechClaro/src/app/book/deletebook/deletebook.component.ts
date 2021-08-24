import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-deletebook',
  templateUrl: './deletebook.component.html',
  styleUrls: ['./deletebook.component.css']
})
export class DeletebookComponent implements OnInit {
  public respuesta:any = [];
  public form!: FormGroup;
  public previsualizacion: string = "./assets/sin_imagen.jpg";
  public loading: boolean = false;

  constructor(private route:ActivatedRoute,private router: Router,private bookService:BookService,private formBuilder: FormBuilder,private toastr:ToastrService) { }
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
    this.bookService.deleteBook('/api/Books/'+this.Id).subscribe(respuesta => {
      this.respuesta = respuesta;
      console.log("respuesta del servidor:"+ this.respuesta)
      if(this.respuesta == 200){
        console.log('Libro modificado!');
        this.ShowToastrExito();
        this.router.navigate(['/listbook']);
      }
      else{
        console.log('Error al modificar libro');
        this.ShowToastrError(respuesta);
      }
    })
  }

  ShowToastrExito(){
    this.toastr.success("Libro Guardado!", "Exito!",{timeOut:1000});
  }
  ShowToastrError(tipoError?:any){
    this.toastr.error("Error al guardado Libro!", "Error! " + tipoError,{timeOut:1000});
  }

}
