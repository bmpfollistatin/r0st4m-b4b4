import { Container, Text } from "native-base";
import propTypes from 'prop-types';
import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';
import GenericListAndSearch from '../../components/GenericListAndSearch';
import PageHeader from '../../components/PageHeader';
import PlusFab from '../../components/PlusFab';
import { clear as clearCreateWorkoutPlan, load as loadCreateWorkoutPlan } from '../../redux/actions/creating/creatingWorkoutPlanActions';
import { filterWorkoutPlans } from '../../redux/reducers/workoutPlanReducer';


var styles = require('../../../assets/files/Styles');

const tmpSvg = () => (
    <Svg
        viewBox="0 0 640 512"
        height={24}
        width={24}
        fill='#7b8794'
    >
        <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                        48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
    </Svg >
)

/**
 * List workout plans in cards with search bar at top.
 * Filters cards based on search results.
 * Optionaly calls navivation goBack after selection is made.
 * Props may have a function to perform when the user makes a selection.
 * @param {object} props
 */
export default function ListAndSearchWorkoutPlans(props) {
    const dispatch = useDispatch();
    const dataSource = filterWorkoutPlans(useSelector(state => state.workoutPlan), { type: 'all' });
    const { navigation } = props;
    const params = props.route.params

    let view = params && params.view ? params.view : null;
    if (!view) {
        view = props.view;
    }
    // callback
    let setSelected = params && params.setSelected ? params.setSelected : null;
    if (!setSelected) {
        setSelected = props.setSelected;
    }

    // Use passed in setSelected, or default select action if nothing passed in.
    const handleSelect = (item) => {
        console.log({ item })
        if (!!setSelected) {
            setSelected(item);
        } else {
            // default
            if (!!navigation) {
                dispatch(loadCreateWorkoutPlan(item));
                setTimeout(() => {
                    navigation.navigate('CreateWorkoutPlan')
                },500);;
            }
        }
    };

    return (
        <Container style={styles.background_general}>
            <PageHeader
                NavigationProp="IntervalTimer"
                RightSideProp='Interval Timer'
                SVG={tmpSvg}
                Title='Workouts Plans'
            >
            </PageHeader>
            <GenericListAndSearch dataSource={dataSource} setSelected={handleSelect}>
                {workoutPlan => {
                    return (
                        <Text>{workoutPlan.note}</Text>
                    )
                }}
            </GenericListAndSearch>
            {/* plus button, show if  */}
            {view !== 'simple' && !!navigation && (
                <PlusFab
                    onPress={() => {
                        dispatch(clearCreateWorkoutPlan()),
                            navigation.navigate('CreateWorkoutPlan',
                                {
                                    // pass along the setSelected that was passed in 
                                    extraActions: setSelected,
                                });
                    }}
                />
            )}

        </Container>
    )
}

// propTypes
// ListAndSearchWorkoutPlans.propTypes = {
//     navigation: propTypes.shape({
//         state: propTypes.shape({
//             params: propTypes.shape({
//                 setSelected: propTypes.func
//             })
//         }),
//     }).isRequired,
// }