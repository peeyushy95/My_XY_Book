import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'orderByPipe'})
export class TopicSorting implements PipeTransform{
    transform(array: Array<any>): Array<any> {
        if(!array || array === undefined || array.length === 0) return array;
        array.sort((a: any, b: any) => {
            if (a.desc < b.desc) {
                return -1;
            } else if (a.desc > b.desc) {
                return 1;
            } 
            return 0;        
        });
        return array;
    }
}