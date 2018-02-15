import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'replaceLineHtml',
})
export class ReplaceLineHtmlPipe implements PipeTransform {
    transform(value: string, ...args) {
        if(value != ""){
            return value.replace(/\\n|\r\n|\r|\n/g, "<br>");
        }else{
            return "";
        }
    }
}
