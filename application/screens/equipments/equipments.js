import { Container, Content } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableHighlight, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import { toogleSelect } from '../../redux/features/equipment/equipment.slice';
import { EqStyle } from './equipments.style';

const RenderEquipmentCard = (props) => {
    const dispatch = useDispatch()

    const selectCard = () => {
        dispatch(toogleSelect(props.item))
    }

    return (
        <TouchableHighlight onPress={selectCard} underlayColor={'transparent'} style={EqStyle.eqCardContainer}>
            <View style={[EqStyle.eqCard, { backgroundColor: props.item.selected ? '#263238' : "#eceff1" }]}>
                <Text style={[EqStyle.eqCardName, { color: props.item.selected ? '#fff' : "#000" }]}>{props.item.Name}</Text>
                <View style={[EqStyle.eqImageContainer, { backgroundColor: props.item.selected ? '#212121' : "#cfd8dc" }]}>
                    <Image resizeMode="contain" style={EqStyle.eqImage} source={props.item.image} />
                </View>
            </View>
        </TouchableHighlight>
    )
}

const RenderSubCategories = (props) => {
    const _data = props.data && Array.isArray(props.data) ? props.data : []
    return (
        <FlatList
            scrollEnabled={false}
            numColumns={2}
            data={_data}
            renderItem={({ item, index }) => <RenderEquipmentCard item={item} />}
        />
    )
}

const RenderTypes = (props) => {
    const equipments = useSelector((state) => state.equipments.value)
    let thisCatEquipmets = equipments.filter(i => i.EquipmentType == props.type);
    let formated = [];
    let withoutCats = []
    thisCatEquipmets.map(i => {
        if (i.Subcategory !== "") {
            let exi = formated.findIndex(p => i.Subcategory == p.Subcategory)
            if (exi > -1) {
                formated[exi].items.push(i)
            } else {
                formated.push({
                    Subcategory: i.Subcategory,
                    items: [i]
                })
            }
        } else {
            withoutCats.push(i)
        }
    })

    return (
        <View style={{ width: '100%', paddingLeft: 10, paddingRight: 10 }}>
            <FlatList
                data={formated}
                scrollEnabled={false}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ marginTop: 20 }}>
                            <Text style={EqStyle.categoryTitle}>{item.Subcategory}</Text>
                            <RenderSubCategories data={item.items} />
                        </View>
                    )
                }}
            />
            <View style={[EqStyle.dc, { display: formated.length > 0 ? 'flex' : 'none' }]}>
                <View style={EqStyle.d}></View>
            </View>

            <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={withoutCats}
                renderItem={({ item, index }) => <RenderEquipmentCard item={item} />}
            />
        </View>
    )
}

const RenderTopMenu = (props) => {
    return (
        <FlatList
            data={props.types}
            horizontal={true}
            style={EqStyle.headerList}
            renderItem={({ item, index }) => {
                return (
                    <TouchableHighlight underlayColor={'transparent'} onPress={() => props.setSelected(index)} style={[EqStyle.headerTochable, { borderBottomWidth: index == props.selected ? 1 : 0 }]}>
                        <Text style={{ fontWeight: '400', fontSize: 16, color: index == props.selected ? '#000' : '#00000090' }}>{item}</Text>
                    </TouchableHighlight>
                )
            }}
        />
    )
}

export const Equipments = (props) => {
    const equipments = useSelector((state) => state.equipments.value)
    const [types, setTypes] = useState([])
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        extractCategories()
    }, []);

    const extractCategories = () => {
        let _types = []
        equipments.map(i => {
            if (!_types.find(e => e == i.EquipmentType)) {
                _types.push(i.EquipmentType)
            }
        })
        setTypes(_types)
    };

    return (
        <Container>
            <PageHeader
                NavigationProp="IntervalTimer"
                RightSideProp="Interval Timer"
                Title="Equipments">
            </PageHeader>

            <Content>
                <RenderTopMenu
                    types={types}
                    selected={selected}
                    setSelected={i => setSelected(i)}
                />
                <RenderTypes type={types[selected]} />
            </Content>
        </Container>
    );
}

