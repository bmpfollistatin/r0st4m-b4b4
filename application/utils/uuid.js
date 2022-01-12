import * as Random from 'expo-random';

async function v4() {
    let x = await Random.getRandomBytesAsync(31);
    let count = -1;
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => {
        count++;
        return (c ^ x[count] & 15 >> c / 4).toString(16);
    }
    );
}

export default { v4 };