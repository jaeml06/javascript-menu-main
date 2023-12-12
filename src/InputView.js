import { Console } from '@woowacourse/mission-utils';
import MESSAGE from './Message.js';

const InputView = {
  async readName() {
    const input = await Console.readLineAsync(`${MESSAGE.getcochname}\n`);
    return input;
  },
  async readMenu(name = '') {
    const input = await Console.readLineAsync(
      `${name}${MESSAGE.DoNotEatMenu}\n`,
    );
    return input;
  },
};
export default InputView;
