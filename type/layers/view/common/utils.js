export const createSVGElement = (svgData) => {
    const { xmlns = 'http://www.w3.org/2000/svg', viewBox = '0 0 512 512', path } = svgData;
    const svgElement = document.createElementNS(xmlns, 'svg');
    svgElement.setAttribute('viewBox', viewBox);
    const pathElement = document.createElementNS(xmlns, 'path');
    pathElement.setAttribute('d', path);
    svgElement.appendChild(pathElement);
    return svgElement;
};
