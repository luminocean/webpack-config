export function toCapitalized(str){
    let result = '';
    let gap = 'a'.charCodeAt(0) - 'A'.charCodeAt(0);

    for(let i=0; i<str.length; i++){
        let char = str.charAt(i);
        if( char >= 'a' && char <= 'z'){
            result += String.fromCharCode(char.charCodeAt(0) - gap)
        }else{
            result += char;
        }
    }

    return result;
}
