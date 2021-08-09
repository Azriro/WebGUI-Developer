import {Component, OnInit} from '@angular/core';
import {GithubapiService} from '../services/GithubapiService';

export class DataElement {
  id: string;
  name: string;
  fullname: string;
  url: string;
  owner: string;
  description: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'WebGUI-Developer';
  displayedColumns: string[] = ['id', 'name', 'fullname', 'owner', 'url', 'description'];
  dataSource: any;
  searchText: any;

  constructor(private apiService: GithubapiService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.loadData();
  }

  // tslint:disable-next-line:typedef
  loadData() {
    this.apiService.getRepos().subscribe((data: any) => {
      this.dataAssign(data);
    });
  }

  // tslint:disable-next-line:typedef
  onSearch(text: any) {
    if (this.searchText) {
      this.apiService.getReposByKeyword(text).subscribe((data: any) => {
        this.dataAssign(data.items);
      });
    } else {
      this.loadData();
    }
  }

  // tslint:disable-next-line:typedef
  dataAssign(repos: any) {
    const dataList: any = [];
    repos.forEach((list) => {
      const listData = new DataElement();
      listData.id = list.id;
      listData.name = list.name;
      listData.fullname = list.full_name;
      listData.url = list.url;
      listData.owner = list.owner.login;
      listData.description = list.description;

      dataList.push(listData);
    });
    this.dataSource = dataList;
  }

}
