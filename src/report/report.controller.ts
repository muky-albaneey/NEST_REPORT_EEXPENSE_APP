import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put,ParseUUIDPipe,ParseEnumPipe} from '@nestjs/common';
import {data, ReportType} from 'src/data';
import {ReportService} from 'src/report/report.service';
import {CreateReportDto,updateReportDto,ReportResponseDto} from "src/dto/report.dto";


@Controller('report/:type')
export class ReportController{
  constructor( private readonly reportService : ReportService){

  }
    @Get()
    getReport(@Param('type', new ParseEnumPipe(ReportType)) type : string) : ReportResponseDto[]{

      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
        // return data.report.filter(report => report.type === reportType)
        return this.reportService.getReport(reportType)
    }

    @Get(':id')
    getReportById(@Param('type', new ParseEnumPipe (ReportType))  type : string, @Param('id', ParseUUIDPipe) id : string) : ReportResponseDto{

      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      //  return data.report.filter(report => report.type === reportType).find(reportId => reportId.id === id)
      return this.reportService.getReportById(reportType,id);
    }

    @Post()
    createdReport(@Body() {source, amount} : CreateReportDto ,@Param('type', new ParseEnumPipe (ReportType)) type : string) : ReportResponseDto{
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.createdReport(reportType, {source, amount})
    //   const createdReport = {
    //     id : uid(),
    //     source,
    //     amount,
    //     createdAt : new Date (),
    //     updatedAt : new Date(),
    //     type : reportType

    //   }

    //  data.report.push(createdReport);
     
    }

    @Put(':id')
    updatedReport(@Body() body : updateReportDto, @Param('type', new ParseEnumPipe(ReportType)) type : string, @Param('id',ParseUUIDPipe) id : string) :ReportResponseDto{
      
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;

      return this.reportService.updatedReport(reportType,id,body)
      // const updateReport = data.report
      //     .filter(reportUpdate => reportUpdate.type === reportType)
      //     .find(reportId => reportId.id === id)

      //     if(!updateReport) return 'hola';

      //     const findIndexReport = data.report.findIndex(indexReport => indexReport.id === updateReport.id);

      //     data.report[findIndexReport] = {
      //       ...data.report[findIndexReport],
      //       ...body
      //     }

      //     return data.report[findIndexReport];
    }

    @HttpCode(204)
    @Delete(':id')
    deleteReport(@Param('type', new ParseEnumPipe (ReportType)) type : string, @Param('id',ParseUUIDPipe) id : string) : ReportResponseDto[]{
      const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
      return this.reportService.deleteReport(reportType,id)
      // const updateReport = data.report
      //     .filter(reportUpdate => reportUpdate.type === reportType)
      //     .find(reportId => reportId.id === id)

      //     if(!updateReport) return 'hola';

      //     const DeleteIndexReport = data.report.findIndex(indexReport => indexReport.id === updateReport.id);
      //     if(DeleteIndexReport === -1)return 'its -1'
      //     data.report.splice(DeleteIndexReport, 1);

    }

}