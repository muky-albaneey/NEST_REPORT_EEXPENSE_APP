import {IsNumber, IsPositive,IsString,IsNotEmpty,IsOptional} from "class-validator";
import {Exclude,Expose} from 'class-transformer';
import {data, ReportType} from 'src/data';

export class CreateReportDto {
    @IsString()
    @IsNotEmpty()
    source : string;

    @IsNumber()
    @IsPositive() 
    amount : number;
}

export class updateReportDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source : string;

    @IsOptional()
    @IsNumber()
    @IsPositive() 
    amount : number;
}

export class ReportResponseDto {
    id : string;
    source : string;
    amount : number;
    @Exclude()
    createdAt: Date;

    @Exclude()
    updatedAt : Date;

    @Expose({name : "created at"})
    transformCreat () {
        return this.createdAt;
    }

    type : ReportType;

   
    constructor(partialtData : Partial<ReportResponseDto>){
        Object.assign(this, partialtData)
    }

}