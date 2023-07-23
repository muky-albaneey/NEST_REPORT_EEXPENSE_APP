import {Injectable} from "@nestjs/common";
import { Interface } from "readline";
import {data, ReportType} from 'src/data';
import { v4 as uid } from 'uuid';
import {ReportResponseDto} from "src/dto/report.dto"

interface Report {source : string; amount : number};
interface updateReport {source ?: string; amount ?: number};

// @Injectable()
export class ReportService{
  
  getReport(type : ReportType) : ReportResponseDto[]{
    return data.report.filter(report => report.type === type).map(report=> new ReportResponseDto(report));
  }

  getReportById(type : ReportType, id : string) : ReportResponseDto{
    const report = data.report.filter(report => report.type === type).find(reportId => reportId.id === id);

    if(!report) return;

    return new ReportResponseDto(report)
     return;

  }

  createdReport(type : ReportType, {source, amount,} : Report) : ReportResponseDto{
    const createdReport = {
      id : uid(),
      source,
      amount,
      createdAt : new Date (),
      updatedAt : new Date(),
      type : type

    }

   data.report.push(createdReport);
   return new ReportResponseDto (createdReport)
  }

  updatedReport(type : ReportType, id : string, body : updateReport) : ReportResponseDto{
    const updateReport = data.report
    .filter(reportUpdate => reportUpdate.type === type)
    .find(reportId => reportId.id === id)

    if(!updateReport) return ;

    const findIndexReport = data.report.findIndex(indexReport => indexReport.id === updateReport.id);

    data.report[findIndexReport] = {
      ...data.report[findIndexReport],
      ...body
    }

    const report = data.report[findIndexReport];

    return new ReportResponseDto(report)
  }

  deleteReport(type: ReportType, id : string) : ReportResponseDto[]{
    const updateReport = data.report
    .filter(reportUpdate => reportUpdate.type === type)
    .find(reportId => reportId.id === id)

    if(!updateReport) return [];

    const DeleteIndexReport = data.report.findIndex(indexReport => indexReport.id === updateReport.id);
    if(DeleteIndexReport === -1)return [];
    data.report.splice(DeleteIndexReport, 1);
  }
}