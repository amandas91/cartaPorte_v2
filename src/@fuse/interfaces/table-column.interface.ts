import { PipeTransform } from '@angular/core';

export interface TableColumn<T> {
  label: string;
  property: keyof T | string;
  valueAsTooltip?: boolean;
  type: 'text' | 'pipe' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button';
  pipe?: any;
  pipeArgs?: any[];
  visible?: boolean;
  cssClasses?: string[];
}
