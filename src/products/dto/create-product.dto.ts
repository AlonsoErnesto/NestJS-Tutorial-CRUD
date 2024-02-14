import { ApiProperty } from "@nestjs/swagger"
import { 
   IsArray, 
   IsIn, 
   IsInt, 
   IsNumber, 
   IsOptional, 
   IsPositive, 
   IsString, 
   MinLength, 
} from "class-validator"

export class CreateProductDto {

   @ApiProperty({
      description:'product title (unique)',
      nullable:false,
      minLength:1
   })
   @IsString()
   @MinLength(1)
   title: string

   @ApiProperty({
      description:'product price',
      nullable:false,
   })
   @IsNumber()
   @IsPositive()
   price: number

   @ApiProperty({
      description:'product description',
      nullable:false,
   })
   @IsString()
   @IsOptional()
   description?: string

   @ApiProperty({
      description:'product slug',
      nullable:false,
   })
   @IsString()
   @IsOptional()
   slug?: string

   @ApiProperty({
      description:'product stock',
      nullable:false,
   })
   @IsInt()
   @IsPositive()
   @IsOptional()
   stock?: number

   @ApiProperty({
      description:'product tags',
   })
   @IsString({each:true})
   @IsArray()
   @IsOptional()
   tags?: string[]

   @ApiProperty({
      description:'product sized',
      nullable:false,
   })
   @IsString({each:true})
   @IsArray()
   sizes: string[]

   @ApiProperty({
      description:'product gender',
      nullable:false,
   })
   @IsIn(['men', 'women', 'kid', 'unisex'])
   gender: string

   @ApiProperty({
      description:'product images[]',
      nullable:false,
   })
   @IsString({each:true})
   @IsArray()
   @IsOptional()
   images?: string[]
}
