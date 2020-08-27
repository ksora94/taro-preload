import Taro, {useEffect, useState, useCallback, eventCenter} from '@tarojs/taro';
import {Block, Image} from '@tarojs/components';

let PRELOAD_MOUNTED = false;

export type Task = {
  from: string,
  length: number,
  count: number,
  loaded: string[],
  error: string[],
  cb(task: Task): void
}

const ImageTaskMap: { [key: string]: Task } = {}
const Tasks: Set<Task> = new Set<Task>();

const Preload: Taro.FC = () => {
  const [images, setImages] = useState<string[]>([]);

  const removeImages = useCallback((task: Task) => {
    // 避免重复执行callback（实际上因为使用promise，不判断也不会有影响- -
    if (Tasks.has(task)) {
      const newImages = [...images];
      const index = newImages.indexOf(task.from);

      newImages.splice(index, index + task.length);
      setImages(newImages);
      Tasks.delete(task);
      task.cb(task);
    }
  }, [images]);

  const handleLoad = useCallback((event) => {
    const src = event.target.dataset.src;
    const task = ImageTaskMap[src];

    if (task) {
      task.count--;
      event.type === 'error' ? task.error.push(src) : task.loaded.push(src);
      delete ImageTaskMap[src];
      if (task.count === 0) removeImages(task);
    }
  }, [images]);

  useEffect(() => {
    if (PRELOAD_MOUNTED) return; // 防止多个组件注册，只需在首次进入的页面监听事件即可
    PRELOAD_MOUNTED = true;
    eventCenter.on('Preload:add', ({data, cb, timeout}) => {
      let newImages: string[] = [];
      const task = {
        from: '', length: 0, count: 0, loaded: [], error: [], cb
      };

      data.forEach(img => {
        if (images.indexOf(img) < 0) newImages.push(img);
        ImageTaskMap[img] = task;
      });

      task.from = newImages[0];
      task.length = task.count = newImages.length;
      Tasks.add(task);

      setImages(images.concat(newImages));
      // 避免图片加载超时
      if (timeout > 0) setTimeout(() => removeImages(task), timeout)
    })
  }, []);

  return (
      <Block>
        {images.map(src => (
            <Image style={'display: none'} src={src} key={src} data-src={src} onLoad={handleLoad} onError={handleLoad} />
        ))}
      </Block>
  )
};

export default Preload;
