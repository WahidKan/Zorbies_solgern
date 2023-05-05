import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  public notesUri = `${environment.WebApiBaseUrl}Notes`;
  pagedData: any;
  pagedDataNewCardView: any;
  constructor(private http: HttpClient) { }


  getNotesList(notesComment: string, sortColumn: string, sortDir, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.notesUri}/GetList?notesComment=${notesComment}&sortColumn=${sortColumn}&sortDir=${sortDir}&page=${page}&pageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  saveNotes(note: Notes, contactId: any) {
    if (contactId != null) {
      note.notesAddedForId = contactId;
    }
    return this.http.post(this.notesUri, note);
  }
  saveNewNotes(note: FormData) {
    return this.http.post(this.notesUri + `/NewNoteSave`,  note);
  }
  getNoteslist(leadid: any, searchText: any, submodulename: any, objectname: any, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string, view: boolean=false): Observable<any> {
    return this.http.get(`${this.notesUri}/getNoteslist?leadid=${leadid}&searchText=${searchText}&submodulename=${submodulename}&objectname=${objectname}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}&view=${view}`)
      .pipe(
        map((response: any) => {
          this.pagedData = response;
          return true;
        })
      );
  }

  getNoteslistCardView(leadid: any, submodulename: any, objectname: any, sortColumn: string, sortDir: string, page: number, pageSize: number, userId: string): Observable<any> {
    return this.http.get(`${this.notesUri}/getNoteslistForCardView?leadid=${leadid}&submodulename=${submodulename}&objectname=${objectname}&SortColumn=${sortColumn}&SortDir=${sortDir}&PageNo=${page}&PageSize=${pageSize}&userId=${userId}`)
      .pipe(
        map((response: any) => {
          this.pagedDataNewCardView = response;
          return true;
        })
      );
  }

  GetImageList(noteId: any, modulename: any, objectRefId: any) {
    return this.http.get(this.notesUri + `/GetImageList?noteId=${noteId}&modulename=${modulename}&objectRefId=${objectRefId}`)
  }
  GetNoteThreadList(noteId: any,  objectRefId: any) {
    return this.http.get(this.notesUri + `/getNoteslistForNotesThreadsByNoteId?leadid=${objectRefId}&notesId=${noteId}`)
  }
  GetNoteCurentDataList(noteId: any, objectRefId: any) {
    return this.http.get(this.notesUri + `/GetNoteCurentDataList?leadid=${objectRefId}&notesId=${noteId}`)
  }
  ChangeStatusForAddmin(noteId: any, objectRefId: any, status:any) {
    return this.http.get(this.notesUri + `/GetChangeStatusForAddmin?objectRefId=${objectRefId}&notesId=${noteId}&status=${status}`)
  }
  setNotesToRead(noteid: any) {
    return this.http.get(`${this.notesUri}/SetNotesToRead?noteid=${noteid}`)
  }
  delImage(Id:any,noteId: any, modulename: any, objectRefId: any) {
    return this.http.get(this.notesUri + `/deleteMulipleUploadingImageImage?noteId=${noteId}&modulename=${modulename}&objectRefId=${objectRefId}&Id=${Id}`)
  }
  GetWorkOrderTypeBasedonWorkorder(accountId:any, objectRefId:any,submoduleName:any) {
    return this.http.get(this.notesUri + `/GetWorkOrderTypeBasedonWorkorder?accountId=${accountId}&objectRefId=${objectRefId}&submoduleName=${submoduleName}`);
  }
  DeleteNote(Id: any ) {
    return this.http.get(this.notesUri + `/DeleteNote?Id=${Id}`)
      
  }
  PinNotes(Id: any) {
    return this.http.get(this.notesUri + `/PinNote?Id=${Id}`)

  }
  private initializeNotes(): Notes {
    // Return an initialized object
    return {
      notesComments: null,
      notesHistoryId: null,
      notesAddedById: null,
      notesCreatedOn: null,
      notesIsDeleted: false,
      notesAddedForId: null,
      name: null,
      userType: null
    };
  }
}

export class Notes {
  notesComments: string;
  notesHistoryId: string;
  notesAddedById: string;
  notesCreatedOn: string;
  notesIsDeleted: boolean;
  notesAddedForId: string;
  name: string;
  userType: string;

  constructor() {
    this.notesComments = '';
    this.notesHistoryId = '';
    this.notesAddedById = '';
    this.notesCreatedOn = '';
    this.notesIsDeleted = false
    this.notesAddedForId = '';
    this.name = '';
    this.userType = '';

  }
 
}
export class newNotesModel {
  noteid: number;
  objectrefid: number;
  title: string;
  status: string;
  assignTo: string;
  notesComments: string;
  moduleName: string;
  RouteUrl:string;
  submoduleName: string;
  notifyTo: string;
  constructor() {
    this.title = '';
    this.status = '';
    this.assignTo = '';
    this.notesComments = '';
    this.moduleName = '';
    this.submoduleName = '';
    this.noteid = 0;
    this.notifyTo = '';
    

  }
}
