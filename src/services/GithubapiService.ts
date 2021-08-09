import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GithubapiService {
  private readonly  apiRoot = 'https://api.github.com/search';
  private readonly  apiRoot2 = 'https://api.github.com/repositories';
  constructor(private http: HttpClient) {

  }

  getReposByKeyword(keyword: any): Observable<any> {
    const url = `${this.apiRoot}/repositories?&q=${keyword}`;
    return this.http.get<any>(url);
  }

  getRepos(): Observable<any> {
    return this.http.get<any>(this.apiRoot2);
  }
}
