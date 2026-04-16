/**
 * Finds whether black or white contrasts more with the given color.
 * @param {String} rgbaColor - The color to be compared.
 * @returns A String which represents black or white.
 */
export function getContrastColor(rgbaColor) {
    let parse_string = rgbaColor.substring(5,rgbaColor.length-1);
    parse_string = parse_string.split(",");

    //find the perceived brightness value
    let brightness = Math.sqrt((parse_string[0]*parse_string[0]*.241)+(parse_string[1]*parse_string[1]*.691)+(parse_string[2]*parse_string[2]*.068));
    if(brightness>130) {
        return 'rgba(0,0,0,1)';
    } else {
        return 'rgba(255,255,255,1)';
    }
}


/**
 * Converts a cell's x and y coordinates into a 0-255 index.
 * @param {int} x - The x coordinate to be converted.
 * @param {int} y - The y coordinate to be converted.
 * @returns The index of the coordinate.
 */
export function convertCoordsToIndex(x,y) {
    return (y*16)+x;
}


/**
 * Replaces one character in the String.
 * @param {String} str - The String to be modified.
 * @param {int} index - The index to swap the character at.
 * @param {char} new_char - The character to be swapped.
 * @returns The new String.
 */
export function modifyString(str,index,new_char) {
    return(str.substring(0,index)+new_char+str.substring(index+1));
}