/* eslint-disable prettier/prettier */

import React from 'react';
import { View, TouchableOpacity, Pressable, Text as Tx } from 'react-native';
import { Button, Icon, Text, Right, Left } from "native-base";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import CustomButton from './Button';
import StartedWorkoutCard from "./StartedWorkoutCard";
import Svg, { Path } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';

const svSets = <Path d="M145.35 207a8 8 0 00-11.35 0l-71 71-39-39a8 8 0 00-11.31 0L1.35 250.34a8 8 0 000 11.32l56 56a8 8 0 0011.31 0l88-88a8 8 0 000-11.32zM62.93 384c-17.67 0-32.4 14.33-32.4 32s14.73 32 32.4 32a32 32 0 000-64zm82.42-337A8 8 0 00134 47l-71 71-39-39a8 8 0 00-11.31 0L1.35 90.34a8 8 0 000 11.32l56 56a8 8 0 0011.31 0l88-88a8 8 0 000-11.32zM503 400H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8v-16a8 8 0 00-8-8zm0-320H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8V88a8 8 0 00-8-8zm0 160H199a8 8 0 00-8 8v16a8 8 0 008 8h304a8 8 0 008-8v-16a8 8 0 00-8-8z" />
const svReps = <Path d="M54.027 327.713C40.129 307.242 32 282.553 32 256c0-70.579 57.421-128 128-128h160v63.969c0 29.239 36.192 43.177 55.785 21.407l72-79.968c10.952-12.169 10.953-30.644 0-42.814l-72-79.974C356.226-11.114 320 2.738 320 32.026V96H160C71.775 96 0 167.775 0 256c0 33.913 10.612 65.391 28.683 91.299 4.427 6.348 13.606 6.936 18.785 1.185l5.488-6.096c3.667-4.073 4.149-10.14 1.071-14.675zM352 32l72 80-72 80V32zm131.317 132.701c-4.427-6.348-13.606-6.936-18.785-1.185l-5.488 6.096c-3.667 4.073-4.149 10.14-1.071 14.675C471.871 204.758 480 229.447 480 256c0 70.579-57.421 128-128 128H192v-63.969c0-29.239-36.192-43.177-55.785-21.407l-72 79.969c-10.952 12.169-10.953 30.644 0 42.814l72 79.974C155.774 523.113 192 509.264 192 479.974V416h160c88.225 0 160-71.775 160-160 0-33.913-10.612-65.391-28.683-91.299zM160 480l-72-80 72-80v160z" />
const svRest = <Path d="M368 32h4c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12H12C5.373 0 0 5.373 0 12v8c0 6.627 5.373 12 12 12h4c0 91.821 44.108 193.657 129.646 224C59.832 286.441 16 388.477 16 480h-4c-6.627 0-12 5.373-12 12v8c0 6.627 5.373 12 12 12h360c6.627 0 12-5.373 12-12v-8c0-6.627-5.373-12-12-12h-4c0-91.821-44.108-193.657-129.646-224C324.168 225.559 368 123.523 368 32zM48 32h288c0 110.457-64.471 200-144 200S48 142.457 48 32zm288 448H48c0-110.457 64.471-200 144-200s144 89.543 144 200zM285.621 96H98.379a12.01 12.01 0 01-11.602-8.903 199.464 199.464 0 01-2.059-8.43C83.054 71.145 88.718 64 96.422 64h191.157c7.704 0 13.368 7.145 11.704 14.667a199.464 199.464 0 01-2.059 8.43A12.013 12.013 0 01285.621 96zm-15.961 50.912a141.625 141.625 0 01-6.774 8.739c-2.301 2.738-5.671 4.348-9.248 4.348H130.362c-3.576 0-6.947-1.61-9.248-4.348a142.319 142.319 0 01-6.774-8.739c-5.657-7.91.088-18.912 9.813-18.912h135.694c9.725 0 15.469 11.003 9.813 18.912z" />


var styles = require('../../assets/files/Styles');

const isSuperset = (list, item, index) => {
    return item.supersetId && list[index + 1] && list[index + 1].supersetId && (item.supersetId == list[index + 1].supersetId)
}

export default function IndexedList(props) {
    // const sss = useSelector(state => state)
    // console.log({sss})
    const _exercises = useSelector(state => state._exercises.value);

    const { orderedList, keyWord } = props;
    const { handleInsert, handleRemove, handleAdd, handleEdit, disabled } = props;

    const getName = (name, exerciseId) => {
        const _name = name ? name : _exercises.find(i => i.id == exerciseId).name
        return _name
    }
    return (
        <>
            <View>
                {orderedList.map((item, index) => {
                    if (item.Deleted) {
                        return null
                    }
                    return (
                        <View key={Math.random()}>
                            <TouchableOpacity key={`${item}-${index}`}>

                                <View style={[styles.ButtonWithMenu, isSuperset(orderedList, item, index) ? { marginTop: 0, marginBottom: 0 } : {}]}>
                                    <Left>
                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: '100%' }}>
                                                <StartedWorkoutCard OpacityNumber={1}
                                                    disabled={disabled}
                                                    SVG='dumbellSVG'
                                                    OptionMenu={
                                                        <Menu>
                                                            <MenuTrigger>
                                                                <Svg
                                                                    viewBox="0 0 64 512"
                                                                    height={34}
                                                                    width={10}
                                                                    fill='#7b8794'
                                                                >
                                                                    <Path d="M32 224c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM0 136c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32zm0 240c0 17.7 14.3 32 32 32s32-14.3 32-32-14.3-32-32-32-32 14.3-32 32z" />
                                                                </Svg>
                                                            </MenuTrigger>


                                                            <MenuOptions>
                                                                <MenuOption onSelect={() => handleInsert(item, index)} text='Duplicate' />
                                                                <MenuOption onSelect={() => handleRemove(item, index)}>
                                                                    <Text style={{ color: 'blue' }}>Delete</Text>
                                                                </MenuOption>
                                                                {handleEdit !== undefined && (
                                                                    <MenuOption onSelect={() => handleEdit(item, index)} text='Edit' />
                                                                )}

                                                            </MenuOptions>

                                                        </Menu>
                                                    }
                                                >
                                                    <Text style={styles.HOneTitles}>{getName(item.name, item.exerciseId)}</Text>
                                                    <View style={{ flexDirection: 'row', paddingTop: 5, display: 'flex' }}>
                                                        {!!item.rests &&
                                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
                                                                <Svg
                                                                    viewBox="0 0 512 512"
                                                                    height={16}
                                                                    width={16}
                                                                    fill='#a8a8a8'
                                                                >
                                                                    {svRest}
                                                                </Svg>
                                                                <Tx style={[{ fontWeight: 'bold', textAlign: 'left', fontSize: 10, color: '#AB091E' }]}>{item.rests}</Tx>
                                                                <Tx style={[{ textAlign: 'left', fontSize: 8, color: 'grey', marginLeft: 1 }]}>sec</Tx>
                                                            </View>

                                                        }

                                                        {!!item.sets &&
                                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginLeft: !!item.rests ? 15 : 0 }}>
                                                                <Svg
                                                                    viewBox="0 0 512 512"
                                                                    height={16}
                                                                    width={16}
                                                                    fill='#a8a8a8'
                                                                >
                                                                    {svSets}
                                                                </Svg>
                                                                <Tx style={[{ fontWeight: 'bold', textAlign: 'left', fontSize: 10, color: '#AB091E', marginLeft: 3 }]}>{item.sets}</Tx>
                                                                <Tx style={[{ textAlign: 'left', fontSize: 8, color: 'grey', marginLeft: 1 }]}>sets</Tx>
                                                            </View>

                                                        }
                                                        {!!item.reps &&
                                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', marginLeft: !!item.sets ? 15 : 0 }}>
                                                                <Svg
                                                                    viewBox="0 0 512 512"
                                                                    height={16}
                                                                    width={16}
                                                                    fill='#a8a8a8'
                                                                >
                                                                    {svReps}
                                                                </Svg>
                                                                <Tx style={[{ fontWeight: 'bold', textAlign: 'left', fontSize: 10, color: '#AB091E', marginLeft: 3 }]}>{item.reps}</Tx>
                                                                <Tx style={[{ textAlign: 'left', fontSize: 8, color: 'grey', marginLeft: 1 }]}>reps</Tx>
                                                            </View>
                                                        }

                                                        {item.exerciseIdList &&
                                                            <ScrollView horizontal='true'>
                                                                <Text style={[styles.WorkoutSet, {}]}>{item.exerciseIdList.join(', ')}</Text>
                                                            </ScrollView>

                                                        }
                                                    </View>
                                                </StartedWorkoutCard>
                                            </View>
                                        </View>
                                    </Left>
                                </View>
                            </TouchableOpacity>

                            <View style={{
                                display: isSuperset(orderedList, item, index) ? "flex" : 'none',
                                height: 20,
                                marginLeft: 30,
                                borderLeftWidth: 2,
                                borderColor: '#00000050',
                                justifyContent: 'center'
                            }}>
                                <Tx style={{ fontSize: 11, marginLeft: 3, color: 'grey' }}>Superset</Tx>
                            </View>
                        </View>

                    );
                })}

                <View style={{ alignItems: 'flex-start', paddingLeft: 15, paddingTop: 15 }}>
                    {/* this is the light green button with plus sign that adds exercises and wokrouts...used everywehere */}
                    <Button iconLeft onPress={handleAdd} style={{ backgroundColor: 'hsl(159, 60%, 92%)', paddingLeft: 10 }}>
                        {/* <Icon type="FontAwesome" name='plus-circle' style={{color: '#00492F'}} /> */}
                        <Svg
                            viewBox="0 0 512 512"
                            height={30}
                            width={30}
                            fill='#00492F'

                        >
                            <Path d="M384 250v12c0 6.6-5.4 12-12 12h-98v98c0 6.6-5.4 12-12 12h-12c-6.6 0-12-5.4-12-12v-98h-98c-6.6 0-12-5.4-12-12v-12c0-6.6 5.4-12 12-12h98v-98c0-6.6 5.4-12 12-12h12c6.6 0 12 5.4 12 12v98h98c6.6 0 12 5.4 12 12zm120 6c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-32 0c0-119.9-97.3-216-216-216-119.9 0-216 97.3-216 216 0 119.9 97.3 216 216 216 119.9 0 216-97.3 216-216z" />
                        </Svg>
                        <Text style={{ color: '#00492F', fontWeight: 'bold' }}>{'Add ' + keyWord}</Text>
                    </Button>

                    {/* </Right> */}
                </View>

            </View>


        </>
    )
}


