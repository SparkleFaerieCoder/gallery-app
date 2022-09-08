import React, { useState } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from '@rneui/themed';
import { Icon, Overlay } from '@rneui/base';

import { Screen } from '@/components/Screen';
import { Container } from '@/components/Container';

const BASE_URI = 'https://source.unsplash.com/random?sig=';

/**
 * A Gallery screen
 */

const styles = StyleSheet.create({
  list: {
    width: '100%',
    backgroundColor: '#000',
  },
  item: {
    aspectRatio: 1,
    flex: 1,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

const items = [...new Array(24)].map((_, i) => BASE_URI + i.toString());

const gallerySections: Record<string, any>[] = [
  { title: 'One', data: [] },
  { title: 'Two', data: [] },
  { title: 'Three', data: [] },
];

items.map((item, i) => gallerySections[i % 4 === 0 ? 0 : 1].data.push(item));

export function GalleryScreen() {
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const renderListItem = ({ item }: { item: string }) => {
    const uri = item;

    return (
      <Container flex={1}>
        <Image
          source={{ uri }}
          PlaceholderContent={
            <ActivityIndicator
              color="white"
              style={{
                height: '100%',
              }}
            />
          }
          containerStyle={styles.item}
          onPress={toggleOverlay}
          transition={true}
        />
        <Overlay
          isVisible={visible}
          onBackdropPress={toggleOverlay}
          overlayStyle={{ backgroundColor: 'white', paddingBottom: 50, paddingTop: 0 }}
          backdropStyle={{ opacity: 0.8, backgroundColor: 'black' }}
        >
          <Container>
            <Icon
              name="close"
              color="black"
              style={{ textAlign: 'right', alignSelf: 'flex-end' }}
              onPress={toggleOverlay}
            />
            <Image
              source={{ uri }}
              PlaceholderContent={
                <ActivityIndicator
                  color="white"
                  style={{
                    height: '100%',
                  }}
                />
              }
              containerStyle={{ width: '100%', aspectRatio: 1 }}
              transition={true}
            />
          </Container>
        </Overlay>
      </Container>
    );
  };

  return (
    <Screen testID="GalleryScreen" alignItems="center" justifyContent="center">
      <FlatList
        style={styles.list}
        data={items}
        numColumns={3}
        renderItem={renderListItem}
        keyExtractor={(e) => e}
      />
    </Screen>
  );
}
