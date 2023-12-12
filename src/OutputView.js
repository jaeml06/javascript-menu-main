import { Console } from '@woowacourse/mission-utils';
import MESSAGE from './Message.js';
import CATEGORY from './Category.js';

const OutputView = {
  printIntroduce() {
    Console.print(MESSAGE.introduce);
  },
  printResultTitle(category =[]){
    Console.print(MESSAGE.result);
    Console.print('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');
    const categoryName = [];
    category.forEach((value) => {
      categoryName.push(CATEGORY.category[value]);
    });
    Console.print(`[ 카테고리 | ${categoryName.join(' | ')} ]`);
  },

  printUserArray(userArray = []){
    userArray.forEach((user) => {
      Console.print(`[ ${user.getName()} | ${user.getWeekMenu().join(' | ')} ]`);
    });
  },

  printComplete(){
    Console.print(MESSAGE.complete);
  }

};

export default OutputView;
