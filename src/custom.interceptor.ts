import {CallHandler, ExecutionContext, NestInterceptor} from  '@nestjs/common';
import { Console } from 'console';
import { Observable } from 'rxjs';
import{map} from "rxjs"



export class CustomInterceptor implements  NestInterceptor{
    intercept(context : ExecutionContext,handler : CallHandler){
        
        console.group({context})
        return handler.handle().pipe(
            map((data)=>{
                
                    const response = {
                        ...data,
                        created_at : data.createdAt
                    };
                    delete response.updatedAt
                    delete response.createdAt
                    return response;
                }),
        )
    }
        
    
}