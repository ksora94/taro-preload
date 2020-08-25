import {eventCenter} from '@tarojs/taro';
import {Task} from './Pool';

/**
 * 将需要预加载的图片加入图片池
 * @param data
 * @param timeout
 */
export default function preload(data: string[], timeout=1500): Promise<Task> {
  return new Promise(cb => {
    eventCenter.trigger('Preload:add', {data, cb, timeout})
  });
}
