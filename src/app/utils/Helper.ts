// import { v4 as uuidv4 } from 'uuid';


// // Function to generate a new UUID
// export function generateUniqueId(): string {
//     return uuidv4();
// }

export function isEmpty(obj: object) {
    return Object.entries(obj).length === 0 && obj.constructor === Object;
}

export function getRandomColor() {
    const opacity = '0.4';
    const predefinedColorsWithOpacity = [
        `rgba(108, 92, 231, ${opacity})`,
        `gba(116, 185, 255, ${opacity})`,
        `gba(129, 236, 236, ${opacity})`,
        `rgba(85, 239, 196, ${opacity})`,
        `rgba(225, 112, 85, ${opacity})`,
        `gba(255, 118, 117, ${opacity})`,
        `rgba(34, 166, 179, ${opacity})`
    ];

    const randomIndex = Math.floor(Math.random() * predefinedColorsWithOpacity.length);
    return predefinedColorsWithOpacity[randomIndex];
}


export const getStringAfterHyphen = (str: string): string => {
    const parts = str.split('-');
    return parts.length > 1 ? parts[1] : '';
};