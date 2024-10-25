import React from 'react';
import {View, FlatList} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {ITEM_WIDTH, SLIDER_WIDTH} from '../../Pages/OverviewPage';

interface Props {
  data: any;
  renderItem: any;
}
const CarouselCards = (props: Props) => {
  const [index, setIndex] = React.useState(0);
  const isCarousel = React.useRef(null);

  return (
    <View style={{}}>
      <Carousel
        layout='stack'
        layoutCardOffset={0}
        ref={isCarousel}
        data={props.data}
        renderItem={props.renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={index => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        containerStyle={{
          height: '7%',
          position: 'absolute',
          marginLeft: '54%',
          marginTop: '182%',
        }}
        dotsLength={props.data.length}
        activeDotIndex={index}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.52)',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

export default CarouselCards;
