import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-verdetallebook',
  templateUrl: './verdetallebook.component.html',
  styleUrls: ['./verdetallebook.component.css']
})
export class VerdetallebookComponent implements OnInit {
  public respuesta:any = [];
  public form!: FormGroup;
  public previsualizacion: string = "./assets/sin_imagen.jpg";
  public loading: boolean = false;
  
  constructor(private route:ActivatedRoute,private bookService:BookService,private formBuilder: FormBuilder) { }
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

}
