export class Constant {
  public static readonly NORMAL: string = 'NORMAL';
  public static readonly DELETE: string = 'DELETE';
  public static readonly HIDDEN: string = 'HIDDEN';
  public static readonly SUSPEND: string = 'SUSPEND';

  public static readonly UPDATE_NOT_FOUND: string = 'UPDATE_NOT_FOUND';
  public static readonly DELETE_NOT_FOUND: string = 'DELETE_NOT_FOUND';
  public static readonly UNAUTHORIZED: string = 'UNAUTHORIZED';

  public static readonly HEADER_KEY: string = 'authorization';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static returnDbErrorResponse(error: any): any {
    console.log('<--Sequelize: [Run SQL Error]-->\n' + error);
    // const response: IResponse = { result: false, message: 'SQL Error', jsonData: error }
    return null;
  }

  public static readonly soldiers = ['INFANTRY', 'CAVALRY', 'SPEARMAN', 'ARCHER'];
}

export class RoleConst {
  public static readonly ADMIN: string = 'ADMIN';
  public static readonly DUKE: string = 'DUKE';
  public static readonly MARQUIS: string = 'MARQUIS';
  public static readonly COUNT: string = 'COUNT';
  public static readonly BARON: string = 'BARON';
  public static readonly KNIGHT: string = 'KNIGHT';
}

export class Message {
  public static readonly NOT_UPDATE_DATA: string = '수정할 데이터 없음';
  public static readonly NOT_DELETE_DATA: string = '삭제할 데이터 없음';
  public static readonly UNAUTHORIZED_USER: string = '인증되어있지 않음';
  public static readonly DISALLOWED_USER: string = '허용되지 않은 사용자';
  public static readonly EXPIRATION_AUTHORIZED: string = '인증 만료됨';

  public static readonly DUPLICATE_DATA: string = '중복 데이터';
}
