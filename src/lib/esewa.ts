import crypto from 'crypto';

export function generateEsewaSignature(
  totalAmount: string,
  transactionUuid: string,
  productCode: string
): string {
  const message = `total_amount=${totalAmount},transaction_uuid=${transactionUuid},product_code=${productCode}`;
  const secret = process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q';
  
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(message);
  return hmac.digest('base64');
}

export function verifyEsewaSignature(data: string): boolean {
  try {
    const decoded = JSON.parse(Buffer.from(data, 'base64').toString());
    const { transaction_code, status, total_amount, transaction_uuid, product_code, signature } = decoded;
    
    const message = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=transaction_code,status,total_amount,transaction_uuid,product_code,signed_field_names`;
    const secret = process.env.ESEWA_SECRET_KEY || '8gBm/:&EnhH.1/q';
    
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(message);
    const generatedSignature = hmac.digest('base64');
    
    return generatedSignature === signature;
  } catch {
    return false;
  }
}
