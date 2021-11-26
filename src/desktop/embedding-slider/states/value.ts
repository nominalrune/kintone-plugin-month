import { atom } from 'recoil';

const state = atom<number>({ key: 'valueState', default: 0 });

export default state;
