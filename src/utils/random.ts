// 随机颜色函数
import { colors } from './constants';
export const randomNum = (m: number, n: number) => {
  return Math.floor(Math.random() * (m - n) + n);
};
export const randomColor = () => {
  return colors[randomNum(1, 13)];
};
