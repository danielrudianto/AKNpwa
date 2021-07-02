import { Client } from './client';

export interface Project {
}

export interface CodeProject {
  Id?: number;
  CreatedBy: number | string;
  CreatedDate: Date;
  Name: string;
  Document: string;
  Client: Client;
  Address: string;
}
