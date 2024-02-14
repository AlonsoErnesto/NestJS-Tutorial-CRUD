import { ApiProperty } from "@nestjs/swagger";
import { 
   BeforeInsert, 
   BeforeUpdate, 
   Column, 
   Entity, 
   ManyToOne, 
   OneToMany, 
   PrimaryGeneratedColumn
} from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/auth.entity";

@Entity({
   name:'products'
})
export class Product {

   @ApiProperty({ 
      example:'cd487238989-f3-d32-d31v4-asdc-3rfas',
      description:'Product UUID',
      uniqueItems:true
   })
   @PrimaryGeneratedColumn('uuid')
   id: string;

   @ApiProperty({ 
      example:'T-shirt',
      description:'Product Title',
      uniqueItems:true
   })
   @Column('text',{
      unique:true,
   })
   title: string;

   @ApiProperty({ 
      example:'10.40',
      description:'Precio',
   })
   @Column('float',{
      default:0
   })
   price:number

   @ApiProperty({ 
      example:'T-shirt with woman and men',
      description:'Product Description',
      default:null
   })
   @Column({
      type:'text',
      nullable:true
   })
   description: string;

   @ApiProperty({ 
      example:'t_shirt_teslo',
      description:'Product SLUG - for SEO',
      uniqueItems:true
   })
   @Column('text',{
      unique:true
   })
   slug: string;

   @ApiProperty({ 
      example:'10',
      description:'Product stock',
      default:0
   })
   @Column('int',{
      default: 0
   })
   stock: number

   @ApiProperty({ 
      example:['M','XL'],
      description:'Product sized',
   })
   @Column('text',{
      array: true
   })
   sizes: string[]

   @ApiProperty({ 
      example:'women',
      description:'Product gender',
   })
   @Column('text')
   gender: string

   //tags
   @Column({
      type:'text',
      array: true,
      default:[]
   })
   tags: string[]

   //images
   @OneToMany(
      ()=> ProductImage,
      (productImage) => productImage.product,
      {cascade:true, eager:true}
   )
   images?:ProductImage[]

   @ManyToOne(
      () => User,
      (user) => user.product,
      {eager:true} //trae la relacion de otra tabla
   )
   user: User

   @BeforeInsert()
   checkSlugInsert(){
      if(!this.slug){
         this.slug = this.title
      }
      this.slug = this.slug
         .toLowerCase()
         .replaceAll(' ','_')
         .replaceAll("'",'')
   }

   @BeforeUpdate()
   checSlugUpdate(){
      if(!this.slug) {
         this.slug = this.title
      }
      this.slug = this.slug
         .toLowerCase()
         .replaceAll(' ','_')
         .replaceAll("'",'')
   }
}
