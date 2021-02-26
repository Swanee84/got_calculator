INSERT INTO code (parent_code, code, code_name, sort, status, created_id)
VALUES ('ROOT', 'STATUS', '상태 코드', 1, 'NORMAL', 0)
     , ('ROOT', 'GUILD', '길드 코드', 2, 'NORMAL', 0)
     , ('ROOT', 'SOLDIER', '병종 코드', 3, 'NORMAL', 0)
     , ('ROOT', 'ROLE', '권한 코드', 4, 'NORMAL', 0)
     , ('ROOT', 'ACC_TYPE', '계정 유형 코드', 5, 'NORMAL', 0)
     , ('ROOT', 'CLASS', '계급 코드', 6, 'NORMAL', 0)
     , ('STATUS', 'NORMAL', '사용', 1, 'NORMAL', 0)
     , ('STATUS', 'DELETE', '삭제', 2, 'NORMAL', 0)
     , ('STATUS', 'HIDDEN', '숨김', 3, 'NORMAL', 0)
     , ('STATUS', 'SUSPEND', '휴면', 4, 'NORMAL', 0)
     , ('GUILD', 'ONEB', 'Bless', 1, 'NORMAL', 0)
     , ('GUILD', 'ONEK', '연합 K', 2, 'NORMAL', 0)
     , ('GUILD', 'ONEZ', '연합 Z', 3, 'NORMAL', 0)
     , ('SOLDIER', 'INFANTRY', '보병', 1, 'NORMAL', 0)
     , ('SOLDIER', 'CAVALRY', '기병', 2, 'NORMAL', 0)
     , ('SOLDIER', 'SPEARMAN', '창병', 3, 'NORMAL', 0)
     , ('SOLDIER', 'ARCHER', '궁병', 4, 'NORMAL', 0)
     , ('ROLE', 'STANDARD', '일반', 1, 'NORMAL', 0)
     , ('ROLE', 'SUPER', '간부', 2, 'NORMAL', 0)
     , ('ROLE', 'ADMIN', '관리자', 3, 'NORMAL', 0)
     , ('ACC_TYPE', 'MAIN', '주 계정', 1, 'NORMAL', 0)
     , ('ACC_TYPE', 'SUB', '부 계정', 2, 'NORMAL', 0)
     , ('CLASS', 'DUKE', '공작', 1, 'NORMAL', 0)
     , ('CLASS', 'MARQUIS', '후작', 2, 'NORMAL', 0)
     , ('CLASS', 'COUNT', '백작', 3, 'NORMAL', 0)
     , ('CLASS', 'BARON', '남작', 4, 'NORMAL', 0)
     , ('CLASS', 'KNIGHT', '기사', 5, 'NORMAL', 0)
;