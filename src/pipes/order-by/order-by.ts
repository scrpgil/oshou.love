import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
    transform(array: any[]): any[] {
        if(array && array.length > 0) {
            array.sort((a: any, b: any) => {
                if (a.transaction.timeStamp > b.transaction.timeStamp) {
                    return -1;
                } else if (a.transaction.timeStamp < b.transaction.timeStamp) {
                    return 1;
                } else {
                    return 0;
                }
            });
        }
        return array;
    }
}
