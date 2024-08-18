import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Recipe } from './recipe';

export interface Category {
  id: number;
  name: string;
  number: number;
  iconName: IconDefinition;
  recipes: Recipe[];
}
