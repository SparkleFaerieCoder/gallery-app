import React, { FC } from 'react';
import { Avatar } from '@rneui/themed';

import { Screen } from '@/components/Screen';
import { Container } from '@/components/Container';

/**
 * A Profile screen
 */
export const ProfileScreen: FC = () => {
  return (
    <Screen testID="ProfileScreen" alignItems="center" justifyContent="center">
      <Container>
        <Avatar size={64} rounded title="Fc" containerStyle={{ backgroundColor: '#3d4db7' }} />
      </Container>
    </Screen>
  );
};
