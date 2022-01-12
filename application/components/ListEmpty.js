import React from 'react';
import { Text, View } from 'react-native';
import Strings from '../utils/Strings';

function ListEmpty(props) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 80 }}>
      <Text style={{ fontSize: 19, fontWeight: 'bold', marginBottom: 10 }}>{Strings.ST66}</Text>
      <Text style={{ fontSize: 14, marginBottom: 8, color: '#D1D1D1' }}>{Strings.ST67}</Text>
    </View>
  )
}

export default ListEmpty;
