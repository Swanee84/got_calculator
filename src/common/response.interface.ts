export class BaseResponse {
  message?: string;
  status: number;
  code?: string;
  success: boolean;

  constructor(_message?: string, _code?: string, _status?: number, _success?: boolean) {
    this.status = _status ?? 200;
    this.success = _success ?? true;
    this.message = _message;
    this.code = _code;
  }

  // constructor(initValue: { status?: number; success?: boolean; message?: string; code?: string }) {
  //   this.status = initValue.status ?? 200
  //   this.success = initValue.success ?? true
  //   this.message = initValue.message
  //   this.code = initValue.code
  // }
}

export class StandardResponse<T> extends BaseResponse {
  data?: T;
  dataList?: T[];

  constructor(initValue: { data?: T; dataList?: T[] }) {
    super();
    this.data = initValue.data;
    this.dataList = initValue.dataList;
  }

  // constructor(_list?: string) {
  //   super()
  //   this.list = _list
  // }
}

export class PagingResponse<T> extends BaseResponse {
  data: T[];
  total: number;
  current: number;
  pageSize: number;

  constructor(_data: T[], _total: number, _current: number, _pageSize: number) {
    super();
    this.data = _data;
    this.total = _total;
    this.current = _current;
    this.pageSize = _pageSize;
  }
}
