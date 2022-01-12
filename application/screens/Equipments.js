import { Body, CheckBox, Container, Content, ListItem, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PageHeader from '../components/PageHeader';
import { filterEquipments } from '../redux/reducers/EquipmetReducer';

export default function Equipments(props) {
    const equipment = useSelector(state => state.equipment);
    const allEquipmentList = filterEquipments(equipment, { type: 'all' });
    const [selected, setSelected] = useState(['testing']);

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    const handleOnPress = (checkBoxParam) => {
        console.log('pressed - 2');
    };

    let prevEquiType = undefined;

    function Listings({ children }) {
        const [status, setStatus] = useState(false);

        return (
            <ListItem
                onPress={() => setStatus(!status)}
                style={{
                    borderBottomWidth: 0,
                    paddingVertical: 10,
                    justifyContent: 'center',
                }}>
                <CheckBox
                    checked={status}
                    onPress={() => handleOnPress(children)}
                />
                <Body>
                    <Text style={{ color: 'hsl(98, 0%, 11%)' }}>{children}</Text>
                </Body>
            </ListItem>
        );
    }

    return (
        <Container>
            <PageHeader
                NavigationProp="IntervalTimer"
                RightSideProp="Interval Timer"
                Title="Equipments"></PageHeader>

            <Content>
                {Object.entries(
                    allEquipmentList.reduce(
                        (byType, item) => ({
                            ...byType,
                            [item.type]: [...(byType[item.type] || []), item],
                        }),
                        {},
                    ),
                ).map(([type, items]) =>
                    items.map((item, index) => {
                        // since this is inside of a bracket {} you can type javascript here and
                        // you need them here so you can refer to the equipment types via item.type
                        // if you do this outside somewhere else it is not able to map through all of the
                        // equipment to check against the next thing...a different version of this is done in
                        // history of workout
                        var printEquipmentType = false;

                        if (prevEquiType === undefined || prevEquiType !== item.type) {
                            prevEquiType = item.type;
                            printEquipmentType = true;
                        }
                        return (
                            <>
                                {printEquipmentType && (
                                    <Text key={'textfield' + index}
                                        style={{
                                            padding: 10,
                                            paddingTop: 20,
                                            fontSize: 20,
                                            color: 'grey',
                                            paddingBottom: 0,
                                        }}>
                                        {item.type}
                                    </Text>
                                )}

                                <Listings key={index} setSelected={setSelected}>
                                    {item.name}
                                </Listings>
                            </>
                        );
                    }),
                )}
            </Content>
        </Container>
    );
}