import { Injectable, EventEmitter } from '@angular/core';
import { UtilService } from './util.service';
@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private contentSessionId: string;
  private schemaName = 'telemetryLogs';

  constructor(private utilService: UtilService) {
    this.contentSessionId = this.utilService.uniqueId();
  }

  public getFingerPrintJsId = () => {
    const fpDetails_v2 = localStorage.getItem("fpDetails_v2");
    return fpDetails_v2 ? JSON.parse(fpDetails_v2) : {};
  };
  
  public getDb = () => {
    const SchemaData = localStorage.getItem(this.schemaName);
    return SchemaData ? JSON.parse(SchemaData) : {};
  };

  public saveDb(data) {
    localStorage.setItem(this.schemaName, JSON.stringify(data, null, 4));
  }

  public getAll() {
    const db = this.getDb();
    const data = Object.keys(db).map((key) => {
      return {
        id: key,
        ...db[key],
      };
    });
    return data;
  }

  public getOne = (id) => {
    const data = this.getAll();
    return data.find((it) => it.id == id);
  };

  public create = (data) => {
    const db = this.getDb();
    const idArr = Object.keys(db).map(e => parseInt(e));
    let id = 0;
    if (idArr.length > 0) {
      id = Math.max(...idArr);
    }
    db[id + 1] = data;
    this.saveDb(db);
  };

  public update = (data) => {
    const db = this.getDb();
    const item = db[data.id];
    if (item) {
      const id = data.id;
      delete data.id;
      db[id] = data;
      this.saveDb(db);
    } else {
      console.log('data not found');
    }
  };

  public destroy = (id) => {
    const db = this.getDb();
    delete db[id];
    this.saveDb(db);
  };
}
