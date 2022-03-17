import { Pipe, PipeTransform, Injector } from '@angular/core';

@Pipe({ name: 'dynamicPipe' })
export class DynamicPipe implements PipeTransform {
  public constructor(private injector: Injector) {
  }

  transform(value: any, pipeToken: any, pipeArgs: any[]): any {
      if (!pipeToken) {
          return value;
      }
      else {
          const pipe = this.injector.get(pipeToken);
          // console.log('Pipe: ' + JSON.stringify(pipe));
          if (pipeArgs) {
            return pipe.transform(value, ...pipeArgs);
          }
          return pipe.transform(value);
      }
  }
}
