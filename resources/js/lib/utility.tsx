export default function removeValueFromArray(arr: any, value: string) {
    var index = arr.indexOf(value);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    return arr;
}
