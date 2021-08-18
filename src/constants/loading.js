import React from 'react';
import {View, Modal} from 'react-native';

import {
  Plane,
  Chase,
  Bounce,
  Wave,
  Pulse,
  Flow,
  Swing,
  Circle,
  CircleFade,
  Grid,
  Fold,
  Wander,
} from 'react-native-animated-spinkit';

//style
import styles from './loadingStyles';

const showSwing = (
  <View style={styles.loading}>
    <Swing size={48} color="red" />
  </View>

  //   <Modal animationType="fade" transparent={true} visible={true}>
  //     <View style={styles.centeredView}>
  //       <View style={styles.loading}>
  //         <Swing size={48} color="red" />
  //       </View>
  //     </View>
  //   </Modal>
);

const showPlane = (
  <View style={styles.loading}>
    <Plane size={48} color="red" />
  </View>
);
const showChase = (
  <View style={styles.loading}>
    <Chase size={48} color="red" />
  </View>
);
const showBounce = (
  <View style={styles.loading}>
    <Bounce size={48} color="red" />
  </View>
);
const showWave = (
  <View style={styles.loading}>
    <Wave size={48} color="red" />
  </View>
);
const showPulse = (
  <View style={styles.loading}>
    <Pulse size={48} color="red" />
  </View>
);
const showFlow = (
  <View style={styles.loading}>
    <Flow size={48} color="red" />
  </View>
);

const showCircle = (
  <View style={styles.loading}>
    <Circle size={48} color="red" />
  </View>
);
const showFade = (
  <View style={styles.loading}>
    <CircleFade size={48} color="red" />
  </View>
);
const showGrid = (
  <View style={styles.loading}>
    <Grid size={48} color="red" />
  </View>
);
const showFold = (
  <View style={styles.loading}>
    <Fold size={48} color="red" />
  </View>
);
const showWander = (
  <View style={styles.loading}>
    <Wander size={48} color="red" />
  </View>
);

export {
  showSwing,
  showPlane,
  showChase,
  showBounce,
  showWave,
  showPulse,
  showFlow,
  showCircle,
  showFade,
  showGrid,
  showFold,
  showWander,
};
