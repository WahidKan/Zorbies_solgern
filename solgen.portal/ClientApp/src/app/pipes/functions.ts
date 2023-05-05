import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: 'UniqueRows'
})
export class UniqueRowsPipe implements PipeTransform {

  transform(obj: any): any {
    let result = [];

    if (obj) {
      let data = obj.map(m => {
        return { 'QUESTION_ID': m.QUESTION_ID, 'QUESTION': m.QUESTION, 'ANSWER': m.ANSWER, 'VISIBLE_TO': m.VISIBLE_TO, 'Attachment': m.ATTACHMENT_PATH, 'ANSWER_GIVEN_BY': m.ANSWER_GIVEN_BY, 'Comment': m.Comment, 'IsCorrect': m.IsCorrect, 'CHECKLIST_TYPE': m.CHECKLIST_TYPE };
      });

      let attachments: Array<Attachment> = [];
      [...data].forEach(item => {

        if (item.Attachment) {
          let att: Attachment = new Attachment();

          att.Answer = item.ANSWER;
          att.Created_By = item.ANSWER_GIVEN_BY;
          att.URL = item.Attachment;
          att.Question_ID = item.QUESTION_ID;

          attachments.push(att);
        }
      });

      const key = 'QUESTION_ID';
      const finalResult = Array.from(new Map(data.map(item => [item[key], item])).values());

      console.log("finalResult", finalResult);
      finalResult.forEach(item => {
        if (attachments.filter(m => m.Question_ID == item[key])) {
          item['Attachment'] = attachments.filter(m => m.Question_ID == item[key]);
        }
      });

      result = finalResult;
    }
    return result;
  }
}

@Pipe({
  name: 'convertToArrayList'
})
export class convertToArrayListPipe implements PipeTransform {

  transform(json: any): any {
    let _result: any[] = [];
    if (json) {
      _result = JSON.parse(json) as [];
    }
    return _result;
  }
}

@Pipe({
  name: 'VoiceCallTimer'
})
export class VoiceCallTimerPipe implements PipeTransform {
  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return (
      ("00" + hours).slice(-2) +
      ":" +
      ("00" + minutes).slice(-2) +
      ":" +
      ("00" + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}



@Pipe({
  name: 'GetUniqueTableNameFromCustomFieldList'
})
export class GetUniqueTableNameFromCustomFieldListPipe implements PipeTransform {
  transform(list) {
    var userInfo = [];
    var companyType;
    userInfo = JSON.parse(localStorage.getItem('userinfo'));
    companyType = userInfo["companyType"];
    if (companyType == "companytypeFinancialInstitute") {
      return list.map(item => item.tableName)

        .filter((value, index, self) => self.indexOf(value) === index)
    }
    else {
      return list.map(item => item.table_name)

        .filter((value, index, self) => self.indexOf(value) === index)
    }

  }
}


@Pipe({
  name: 'GetCustomFieldListByTableName'
})
export class GetCustomFieldListByTableNamePipe implements PipeTransform {
  transform(list, tableName) {
    var userInfo = [];
    var companyType;
    userInfo = JSON.parse(localStorage.getItem('userinfo'));
    companyType = userInfo["companyType"];
    if (companyType == "companytypeFinancialInstitute") {

      return list.filter(item => { return item.tableName == tableName });
    }
    else {
      return list.filter(item => { return item.table_name == tableName });

    }

  }
}


@Pipe({
  name: 'SectionNameWithScore',
  pure: false

})
export class SectionNameWithScorePipe implements PipeTransform {
  transform(obj) {
    var _result = '';
    if (obj != null && obj != '') {

      var finalScore = 0;
      var totalLength = 0;

      obj.Question.forEach(item => {
        if (item.SubQuestions) {
          finalScore = finalScore + (item.SubQuestions.filter(m => m.IsCorrect == 1) as []).length;
          totalLength = totalLength + (item.SubQuestions.filter(m => m.IsCorrect != 2) as []).length;
        }
        else {
          finalScore = finalScore + ((item.AuComments[0].IsCorrect == 1) ? 1 : 0);
          totalLength = totalLength + ((item.AuComments[0].IsCorrect == 2) ? 0 : 1);
        }
      });

      _result = 'Total Questions ' + totalLength + ' , ' + 'Total Answered ' + finalScore;
    }
    else {
      _result = 'Total Questions ' + 0 + ' , ' + 'Total Answered ' + 0;
    }


    return _result;
  }
}


@Pipe({
  name: 'SectionNameWithScoreTop',
  pure: false
})
export class SectionNameWithScoreTopPipe implements PipeTransform {
  transform(obj) {
    var _result = '';
    var finalScore = 0;
    var totalLength = 0;

    obj.Question.forEach(item => {
      if (item.SubQuestions) {
        finalScore = finalScore + (item.SubQuestions.filter(m => m.IsCorrect == 1) as []).length;
        totalLength = totalLength + (item.SubQuestions.filter(m => m.IsCorrect != 2) as []).length;
      }
      else {
        finalScore = finalScore + ((item.AuComments[0].IsCorrect == 1) ? 1 : 0);
        totalLength = totalLength + ((item.AuComments[0].IsCorrect == 2) ? 0 : 1);
      }
    });

    _result = '(' + finalScore + '/' + totalLength + ')';

    return _result;
  }
}



@Pipe({
  name: 'DisplayName',
})
export class DisplayNamePipe implements PipeTransform {
  transform(data: string) {
    var _result = '';
    if (data) {
      data = data.replace('___c', ' ');
      data = data.replace('__c', ' ');
      data = data.replace('__', ' ');
      data = data.replace(/_/g, " ");
      _result = data.replace(/([A-Z])/g, ' $1').trim();
    }

    return _result;
  }
}

@Pipe({
  name: 'EditorDefaultValue',
})
export class EditorDefaultValuePipe implements PipeTransform {
  transform(data: string) {
    var _result = '';
    if (data) {
      _result = data.replace("''", "'");
    }
    return _result;
  }
}


@Pipe({
  name: 'GenerateRoute',
})
export class GenerateRoutePipe implements PipeTransform {
  transform(row, col, type) {

    var _result = '';
    if (row && col) {
      row = Object.keys(row).reduce((c, k) => (c[k.toLowerCase().trim()] = row[k], c), {})
      let column = col.display_name.toLowerCase() == "proposal name" ?
        'proposalid' : col.route_field_name.toLowerCase();
      let data = row[column];
      ;
      _result = col.field_route + (col.display_name.toLowerCase() == "proposal name" ? "/" : "") + data;
    }
    return _result;
  }
}



export class Attachment {
  URL: string;
  Created_By: string;
  Answer: string;
  Question_ID: number;
  constructor() {
    this.URL = "";
    this.Created_By = "";
    this.Answer = "";
    this.Question_ID = null;
  }
}
