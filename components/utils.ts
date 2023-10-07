export default function capitalizeString(inputString: string) {
    if (!inputString) {
        return inputString;
    }

    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
}