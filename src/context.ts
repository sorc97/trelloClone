import React from 'react';
import { IAction } from './interfaces';
import { Dispatch } from 'react';

export interface IContextData {
  dispatch: Dispatch<IAction>
}

/* export interface IContextData {
  dispatch: ({type}:{type:string}) => void;
} */

export const Context = React.createContext<IContextData | null>(null);