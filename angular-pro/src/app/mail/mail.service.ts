import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Mail } from "./models/mail.interface";


const MESSAGES_URL = 'http://localhost:3000/messages'

@Injectable()
export class MailService{
  constructor(
    private http: HttpClient
  ){

  }

  getFolder(folder: string): Observable<Mail[]>{
    return(
      this.http.get<Mail[]>(`${MESSAGES_URL}?folder=${folder}`)
      .pipe(
        map((response: Mail[]) => response)
      )
    );
  }
}
