import {Task} from './components/Preload';
import {eventCenter} from '@tarojs/taro';

export {default as Preload} from './components/Preload';

export default function preload(data: string[], timeout=1500): Promise<Task> {
  return new Promise(cb => {
    eventCenter.trigger('Preload:add', {data, cb, timeout})
  });
}

