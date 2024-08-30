import QRCode from 'qrcode';

export async function generateQRCode(url){
  const qrCode = await QRCode.toDataURL(url);
  return qrCode;
}