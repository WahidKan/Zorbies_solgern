export class OperatingHoursDto {
  createdBy: string;
  createdById: string;
  createdDate: string;
  description: string;
  id: string;
  lastModifiedBy: string;
  lastModifiedById: string;
  lastModifiedDate: string;
  name: string;
  statusId: string;
  timezone: string;
  totalRecord: number;
}


export class PagerResponseDto<T> {
  pager: PagerDto;
  data: T[] = [];
}

export class PagerDto {
  currentPage: number;
  endPage: number;
  pageSize: number;
  startPage: number;
  totalItems: number;
  totalPages: number;
}
