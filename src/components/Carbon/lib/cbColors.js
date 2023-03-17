import { interpolateHcl } from 'd3';

/* primary chart colors */
export const lightBlue = 'rgba(47, 143, 206, 1)';
export const veryDarkBlue = 'rgba(11, 69, 114, 1)';
export const darkBlue = 'rgba(11, 69, 114, 1)';
export const veryDarkBlue = 'rgba(11, 69, 114, 1)';
export const yellow = 'rgba(239, 197, 48, 1)';
export const red = 'rgba(199, 67, 43, 1)';
export const lightGrey = 'rgba(153, 153, 153, 1)';
export const traceGrey = 'rgba(238, 238, 238, 1)';
export const lilac = 'rgba(161, 74, 123, 1)';
export const orange = 'rgba(223, 146, 57, 1)';
/* secondary chart colors*/
export const indigo = 'rgba(103, 59, 155, 1)';
export const palePink = 'rgba(255, 173, 169, 1)';
export const paleBlue = 'rgba(173, 226, 234, 1)';
export const brown = 'rgba(124, 86, 65, 1)';
/* other */
export const darkGrey = 'rgba(51, 51, 51, 1)';
export const midGrey = 'rgba(102, 102, 102, 1)';

export const sequential = interpolateHcl(paleBlue, darkBlue);
export const sequentialAlt = interpolateHcl(paleBlue, red);
export const sequentialAltReverse = interpolateHcl(red, paleBlue);

export const categorical4 = [lightBlue, yellow, lilac, red];
export const categoricalAlt4 = `#66c2a5,#fc8d62,#8da0cb,#e78ac3`.split(',');

export const sequential3 = [sequential(0), sequential(0.5), sequential(1)];
export const sequential4 = [sequential(0), sequential(0.33), sequential(0.66), sequential(1)];
export const sequential5 = [
	sequential(0),
	sequential(0.25),
	sequential(0.5),
	sequential(0.75),
	sequential(1)
];

export const sequentialAlt3 = [sequentialAlt(0), sequentialAlt(0.5), sequentialAlt(1)];
export const sequentialAlt4 = [
	sequentialAlt(0),
	sequentialAlt(0.33),
	sequentialAlt(0.66),
	sequentialAlt(1)
];

export const sequentialAlt5 = [
	sequentialAlt(0),
	sequentialAlt(0.25),
	sequentialAlt(0.5),
	sequentialAlt(0.75),
	sequentialAlt(1)
];

export function setOpacity(rgba='', opacity=1){
  let elements = rgba.split(/[(,)]/g);
  if(elements.length<5){
    return rgba;
  } 
  return `rgba(${[elements[1],elements[2],elements[3],opacity]})`;
}