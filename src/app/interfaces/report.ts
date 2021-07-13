import { User } from './user';

export interface WeatherReportForm {
  WeatherId: number;
  CodeProjectId: number;
  CreatedBy: string;
}

export interface WorkerReportForm {
  Id?: number;
  CreatedDate?: Date;
  Date?: Date;
  CreatedBy: string;
  CodeProjectId: number;
  Workers: Worker[];
}

export interface Worker {
  Id?: number;
  Name: string;
  Quantity: number;
  CodeReportId?: number;
}

export interface ToolReportForm {
  Id?: number;
  CreatedDate?: Date;
  Date?: Date;
  CreatedBy: string;
  CodeProjectId: number;
  Tools: Tool[];
}

export interface Tool {
  Id?: number;
  Name: string;
  Description: string;
  Quantity: number;
  CodeReportId?: number;
}

export interface MaterialReportForm {
  Id?: number;
  CreatedDate?: Date;
  Date?: Date;
  CreatedBy: string;
  CodeProjectId: number;
  Materials: Material[];
}

export interface Material {
  Id?: number;
  Name: string;
  Description: string;
  Quantity: number;
  Unit: string;
  CodeReportId?: number;
  Status: number;
}

export interface Approvals {
  Id?: number;
  CreatedBy: number | string;
  CreatedDate: Date;
  Approval: number;
  Comment: string;
  ReportId?: number;
  User?: User;
}
