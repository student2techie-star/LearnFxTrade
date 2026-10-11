import Razorpay from 'razorpay';
import crypto from 'crypto';

// If credentials are not set in environment, we operate in test/simulation mode
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID || 'rzp_test_dummyKey123456';
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || 'dummySecretKeyABC98765';

export const isLiveRazorpay = Boolean(
  process.env.RAZORPAY_KEY_ID && 
  process.env.RAZORPAY_KEY_SECRET &&
  !process.env.RAZORPAY_KEY_ID.includes('dummy')
);

export const razorpayInstance = isLiveRazorpay
  ? new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    })
  : null;

/**
 * Verifies Razorpay HMAC SHA256 Signature
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!isLiveRazorpay) {
    // In simulated sandbox test mode, verify mock signature format or accept test signatures
    return signature.length > 5;
  }

  try {
    const text = `${orderId}|${paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    return expectedSignature === signature;
  } catch (err) {
    console.error('Signature verification error:', err);
    return false;
  }
}
