import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
const exportAsImage = async (element, imageFileName) => {
  // const canvas = await html2canvas(element);
  const canvas = await domtoimage.toSvg(element);
  // const image = canvas.toDataURL('image/png', 1.0);
  // console.log(image);
  downloadImage(canvas, imageFileName);
};
const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement('a');
  fakeLink.style.display = 'none';
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export default exportAsImage;
