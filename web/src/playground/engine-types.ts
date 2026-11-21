export interface Issue {
  code: string;
  line: number;
  objectId?: string;
  message: string;
}
export interface Report {
  ok: boolean;
  errors: Issue[];
  warnings: Issue[];
}
export interface Request {
  source: string;
  width: number;
  allowUpmath: boolean;
}
export type Reply = { report: Report; svg?: string } | { error: string };
