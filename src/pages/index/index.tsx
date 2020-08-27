import Taro, { Component, Config } from '@tarojs/taro'
import {View, Button, Image} from '@tarojs/components'
import './index.scss'
import preload, {Preload} from '../../index';

export default class Index extends Component {
  readonly state = {
    images: []
  }

  config: Config = {
    navigationBarTitleText: '首页'
  }

  preloadImages = () => {
    const images = new Array((Math.random() * 9 >> 0) + 1).fill(true).map(() => (
        `https://dummyimage.com/${Math.random() * 1000}x${Math.random() * 1000}/eee/444`
    ))

    console.log('create images', images);
    preload(images).then((res) => {
      console.log('finish', res);
      if (res.error.length) {
        console.error(res);
      } else {
        this.setState({images})
      }
    })
  }

  render () {
    return (
      <View className='index'>
        <Button onClick={this.preloadImages}>Preload</Button>
        {this.state.images.map(img => <Image src={img} key={img} mode={'aspectFit'}/>)}

        <Preload/>
      </View>
    )
  }
}
