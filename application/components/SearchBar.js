import { Ionicons } from '@expo/vector-icons';
import { Header, Input, Item } from "native-base";
import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';

var styles = require('../../assets/files/Styles');

// datasource: [{name, tags, ...}, ...]
// takes in data source that has objects of name and tags we can search through along with the ID's
// Props should also have a function to set the selected item to provide the ID to the parent
export default function SearchBar(props) {
    const originalDataSource = props.dataSource;
    const { setSelected, type, showResults, setFilteredData } = props;
    const placeholder = props.placeholder || 'Search';
    const [searchText, setSearchText] = useState('');
    const [dataSource, setDataSource] = useState([]);

    function SearchFilterFunction(text) {
        //passing the inserted text in textinput
        const newData = originalDataSource.filter(item => {
            //applying filter for the inserted text in search bar
            const itemName = item.name ? item.name.toUpperCase() : '';
            // const itemTags = item.tags ? item.tags.map(tag => tag.toUpperCase()) : [];
            const textData = text.toUpperCase();

            // search through tags
            // let foundTag = false;
            // for (let i = 0; i < itemTags.length; i++) {
            //     if (itemTags[i].indexOf(textData) > -1) {
            //         foundTag = true;
            //         break;
            //     }
            // }

            // return itemName.indexOf(textData) > -1 || foundTag;
            return itemName.indexOf(textData) > -1;
        });

        setDataSource(newData);
        if (!!setFilteredData && typeof setFilteredData === 'function') { // pass filtered data back to parents
            setFilteredData(newData);
        }

        setSearchText(text);
    }


    function ListViewItemSeparator() {
        //Item sparator view
        return (
            <View
                style={{
                    height: 0.9,

                }}
            />
        );
    };

    return (
        // <Container style={styles.background_general}>
        <View style={{alignSelf:'center'}}>

            {/*Header For Search Bar*/}
            {type === 'header' && (
                <Header searchBar rounded style={styles.headerBackground}>
                    <Item>
                        <Ionicons name="ios-search" size={25} />
                        <Input
                            placeholder={placeholder}
                            onChangeText={text => SearchFilterFunction(text)}
                            onClear={text => SearchFilterFunction('')}
                            value={searchText}
                            placeholderTextColor='#C4C4C4'
                            selectionColor='#00492F'

                        />
                    </Item>
                    {/*<Button transparent>*/}
                    {/*    <Text>Search</Text>*/}
                    {/*</Button>*/}
                </Header>
            )}

            {type !== 'header' && (
                <Item style={[styles.searchBar, styles.inputItem, styles.inputShadow]}>
                    <Ionicons name="ios-search" size={20} style={{ color: '#c4c4c4', justifyContent:'center', paddingLeft:10}} />
                    <Input
                        placeholder={placeholder}
                        onChangeText={text => SearchFilterFunction(text)}
                        onClear={text => SearchFilterFunction('')}
                        value={searchText}
                        style={styles.inputTextColor}
                        selectionColor='hsl(158, 100%, 40%)'
                    />
                </Item>
            )}

            {!!showResults && searchText !== '' && (
                // <Separator bordered>
                <FlatList
                    style={[styles.searchBarStyle, styles.Beside]}
                    data={dataSource}
                    ItemSeparatorComponent={ListViewItemSeparator}
                    Item Separator View
                    renderItem={({ item }) => (

                        // Single Comes here which will be repeatative for the FlatListItems
                        <View style={[styles.Beside, styles.blah]}>
                            <Image
                                source={item.pics}
                                style={{ fontSize: 5, padding: 10 }}
                            />

                            <Text
                                style={[styles.listDivider, { fontSize: 18, fontweight: 'bold' }]}
                                onPress={() => { setSelected(item); setSearchText('') }}>
                                {item.name}
                            </Text>
                        </View>
                    )}


                    // renderItem={({ item }) => (

                    // trying to add images to the search bar
                    // <ListItem
                    //     roundAvatar
                    //     title={`{item.name}`}
                    //     this would be some grey subtitle that will go below title
                    //     subtitle={item.email}
                    //     avatar={{ uri: item.picture.thumbnail }}
                    //     style={styles.listDivider}
                    //     onPress={() => setSelected(item)}
                    // />
                    // )}


                    enableEmptySections={true}
                    keyExtractor={(item, index) => index.toString()}
                />
            )}
        </View>
    )
}

