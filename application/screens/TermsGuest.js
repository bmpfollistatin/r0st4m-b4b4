import { SimpleLineIcons } from '@expo/vector-icons';
import { Body, Button, Container, Header, Left, Right, Title, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView } from 'react-native';
import AppPreLoader from '../components/AppPreLoader';
import ConfigApp from '../utils/ConfigApp';
import Strings from '../utils/Strings';



export default function TermsGuest(props) {
  const navigationOptions = {
    headerShown: false
  };

  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [dataSource, setDataSource] = useState(null)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      fetch(ConfigApp.URL + 'json/data_strings.php')
        .then((response) => response.json())
        .then((responseJson) => {
          setIsLoading(false)
          setDataSource(responseJson)
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);


  if (isLoading) {
    return (
      <AppPreLoader />
    );
  }

  return (
    <Container style={{ backgroundColor: '#fff' }}>
      <Header style={{ backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, }}>
        <Left style={{ flex: 1 }}>
          <Button transparent>
            <SimpleLineIcons name='arrow-left' style={{ fontSize: 18 }} onPress={() => props.navigation.goBack()} />
          </Button>
        </Left>
        <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
          <Title style={{ color: '#000000' }}>{Strings.ST82}</Title>
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
      <Body>

        <ScrollView>
          <View style={{ padding: 20 }}>
            <FlatList
              data={dataSource}
              refreshing="false"
              renderItem={({ item }) => { }}
              keyExtractor={(item, index) => index.toString()}
            />

            <FlatList
              data={dataSource}
              refreshing="false"
              renderItem={({ item }) => { }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </Body>
    </Container>
  );

}