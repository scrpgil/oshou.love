import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'normalizeFontSize',
})
export class NormalizeFontSizePipe implements PipeTransform {
    transform(val) {
        if(5 < val){
            return 28;
        }
        if(val < 0.1){
            return 9;
        }
        return ((val - 0.1)/(5 - 0.1))*(28 - 9) + 9;
    }
}
