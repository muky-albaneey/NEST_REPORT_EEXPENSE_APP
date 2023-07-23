
export enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}
export const data: Data = {
   report : 
  [ { id : 'uuid',
    source : "web dev",
    amount :64000,
    createdAt : new Date (),
    updatedAt : new Date (),
    type : ReportType.INCOME}]
   }



interface Data{
    report :{
        id : string,
        source : string,
        amount : number,        
        createdAt : Date,
        updatedAt : Date,
        type : ReportType
    }[]
}