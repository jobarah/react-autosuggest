import { Suggestion } from '../types/types'
import { suggestions } from './data';

export async function getStocks(): Promise<Array<Suggestion>> {
  const res = await fakeAPICall()

  return res
}

function fakeAPICall(): Promise<Array<Suggestion>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(suggestions);
    }, 300);
  });
}