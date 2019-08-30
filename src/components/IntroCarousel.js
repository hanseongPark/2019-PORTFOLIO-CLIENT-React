import React from 'react';
import {  Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap';
import item3 from '../img/item3.png'
import item1 from '../img/item1.png'
import item2 from '../img/item2.png'

const items = [
  {
    src: item1,
    altText: 'Slide 1',
    caption: '당신의 몸관리를 위하여 목표 칼로리와 영양성분을 설정하세요',
    header: 'Calorie Calculrater'
  },
  {
    src: item2,
    altText: 'Slide 2',
    caption: '목표 칼로리와 영양성분을 바탕으로 하루 식단관리를 시작해보세요',
    header: 'Diet Management'
  },
  {
    src: item3,
    altText: 'Slide 3',
    caption: '점진적 과부하와 성장을 위하여 운동 부위별 볼륨관리를 할 수 있습니다',
    header: 'Workout Scheduler'
  }
];

export default class IntroCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
  }

  onExiting = () => {
    this.animating = true;
  }

  onExited = () => {
    this.animating = false;
  }

  next = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous = () => {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex = (newIndex) => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.header} />
        </CarouselItem>
      );
    });

    return (
      <Carousel
        activeIndex={activeIndex}
        next={this.next}
        previous={this.previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
      </Carousel>
    );
  }
}
