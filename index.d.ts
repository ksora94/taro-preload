export type Task = {
  /**
   * 需要加载的图片数量
   */
  length: number,
  /**
   * 未加载完成图片数量
   */
  count: number,
  /**
   * 加载成功的图片
   */
  loaded: string[],
  /**
   * 加载失败的图片
   */
  error: string[]
}

/**
 * 预加载图片
 * @param data 图片列表
 * @param timeout 超时时间
 */
export declare function preload(data: string[], timeout?: number): Promise<Task>

declare const Preload: Taro.FC

export default Preload
