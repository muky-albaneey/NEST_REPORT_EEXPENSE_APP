import { Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import {ReportService} from "src/report/report.service";

@Injectable()
export class SummaryService {

    constructor(private readonly reportService :ReportService ){

    }


    calculateService(){
        const totalExpense = this.reportService.getReport(ReportType.EXPENSE).reduce((sum, report)=>{
            return sum + report.amount;
        },0)
        const totaIncome = this.reportService.getReport(ReportType.INCOME).reduce((sum, report) =>{
            return sum + report.amount;

        },0)
        return {
            totaIncome ,
            totalExpense,
            netIncome :  totaIncome - totalExpense
        }
    }
}
