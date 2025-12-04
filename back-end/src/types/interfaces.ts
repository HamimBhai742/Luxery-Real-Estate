export interface IOptions {
  page?: string;
  limit?: string;
  search?: string;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface ISendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer;
    contentType: string;
  }[];
}

export interface IPagination {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}