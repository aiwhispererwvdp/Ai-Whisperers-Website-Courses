/**
 * AWS Lambda Function: Payment Webhook Processor
 * Processes PayPal and Stripe payment webhooks
 * Environment: ${environment}
 */

const crypto = require('crypto');

exports.handler = async (event) => {
    console.log('Processing payment webhook:', JSON.stringify(event, null, 2));
    
    try {
        const headers = event.headers || {};
        const body = event.body;
        
        // Determine webhook source
        let webhookSource = 'unknown';
        if (headers['paypal-transmission-id']) {
            webhookSource = 'paypal';
        } else if (headers['stripe-signature']) {
            webhookSource = 'stripe';
        }

        console.log(`Processing ${webhookSource} webhook`);

        let result;
        switch (webhookSource) {
            case 'paypal':
                result = await processPayPalWebhook(event);
                break;
            case 'stripe':
                result = await processStripeWebhook(event);
                break;
            default:
                throw new Error(`Unknown webhook source: ${webhookSource}`);
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: true,
                message: result.message,
                webhookSource,
                eventType: result.eventType
            })
        };

    } catch (error) {
        console.error('Payment webhook processing failed:', error);
        
        return {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};

async function processPayPalWebhook(event) {
    const headers = event.headers;
    const body = event.body;
    
    // Verify PayPal webhook signature
    const isValid = await verifyPayPalSignature(headers, body);
    if (!isValid) {
        throw new Error('Invalid PayPal webhook signature');
    }

    const webhookEvent = JSON.parse(body);
    const eventType = webhookEvent.event_type;

    console.log(`Processing PayPal event: ${eventType}`);

    switch (eventType) {
        case 'PAYMENT.CAPTURE.COMPLETED':
            return await handlePaymentCompleted(webhookEvent, 'paypal');
            
        case 'PAYMENT.CAPTURE.DENIED':
        case 'PAYMENT.CAPTURE.DECLINED':
            return await handlePaymentFailed(webhookEvent, 'paypal');
            
        case 'PAYMENT.CAPTURE.REFUNDED':
            return await handlePaymentRefunded(webhookEvent, 'paypal');
            
        case 'BILLING.SUBSCRIPTION.CREATED':
            return await handleSubscriptionCreated(webhookEvent, 'paypal');
            
        case 'BILLING.SUBSCRIPTION.CANCELLED':
            return await handleSubscriptionCancelled(webhookEvent, 'paypal');
            
        default:
            console.log(`Unhandled PayPal event type: ${eventType}`);
            return { message: `Event ${eventType} acknowledged but not processed`, eventType };
    }
}

async function processStripeWebhook(event) {
    const signature = event.headers['stripe-signature'];
    const body = event.body;
    
    // Verify Stripe webhook signature
    const isValid = verifyStripeSignature(body, signature);
    if (!isValid) {
        throw new Error('Invalid Stripe webhook signature');
    }

    const webhookEvent = JSON.parse(body);
    const eventType = webhookEvent.type;

    console.log(`Processing Stripe event: ${eventType}`);

    switch (eventType) {
        case 'payment_intent.succeeded':
            return await handlePaymentCompleted(webhookEvent, 'stripe');
            
        case 'payment_intent.payment_failed':
            return await handlePaymentFailed(webhookEvent, 'stripe');
            
        case 'customer.subscription.created':
            return await handleSubscriptionCreated(webhookEvent, 'stripe');
            
        case 'customer.subscription.deleted':
            return await handleSubscriptionCancelled(webhookEvent, 'stripe');
            
        default:
            console.log(`Unhandled Stripe event type: ${eventType}`);
            return { message: `Event ${eventType} acknowledged but not processed`, eventType };
    }
}

async function handlePaymentCompleted(webhookEvent, source) {
    console.log(`Payment completed from ${source}:`, webhookEvent.id);
    
    let paymentData;
    
    if (source === 'paypal') {
        const capture = webhookEvent.resource;
        paymentData = {
            paymentId: capture.id,
            orderId: capture.supplementary_data?.related_ids?.order_id || capture.id,
            amount: capture.amount.value,
            currency: capture.amount.currency_code,
            status: 'completed',
            customerEmail: capture.payer?.email_address,
            customerName: capture.payer?.name?.given_name + ' ' + capture.payer?.name?.surname,
            source: 'paypal'
        };
    } else if (source === 'stripe') {
        const paymentIntent = webhookEvent.data.object;
        paymentData = {
            paymentId: paymentIntent.id,
            orderId: paymentIntent.metadata?.order_id || paymentIntent.id,
            amount: (paymentIntent.amount / 100).toString(), // Stripe uses cents
            currency: paymentIntent.currency.toUpperCase(),
            status: 'completed',
            customerEmail: paymentIntent.receipt_email,
            customerName: paymentIntent.metadata?.customer_name,
            source: 'stripe'
        };
    }

    // Here you would typically:
    // 1. Update your database with payment completion
    // 2. Grant course access to the user
    // 3. Trigger enrollment processing
    // 4. Send confirmation emails

    console.log('Payment data to process:', paymentData);
    
    // Trigger enrollment processor (you could invoke another Lambda here)
    // await triggerEnrollmentProcessor(paymentData);
    
    return {
        message: `Payment ${paymentData.paymentId} processed successfully`,
        eventType: webhookEvent.event_type || webhookEvent.type
    };
}

async function handlePaymentFailed(webhookEvent, source) {
    console.log(`Payment failed from ${source}:`, webhookEvent.id);
    
    let paymentData;
    
    if (source === 'paypal') {
        const capture = webhookEvent.resource;
        paymentData = {
            paymentId: capture.id,
            orderId: capture.supplementary_data?.related_ids?.order_id || capture.id,
            status: 'failed',
            reason: capture.reason_code || 'Payment declined',
            source: 'paypal'
        };
    } else if (source === 'stripe') {
        const paymentIntent = webhookEvent.data.object;
        paymentData = {
            paymentId: paymentIntent.id,
            orderId: paymentIntent.metadata?.order_id || paymentIntent.id,
            status: 'failed',
            reason: paymentIntent.last_payment_error?.message || 'Payment failed',
            source: 'stripe'
        };
    }

    // Here you would typically:
    // 1. Update your database with payment failure
    // 2. Send failure notification to customer
    // 3. Alert admin for manual review if needed

    console.log('Failed payment data:', paymentData);
    
    return {
        message: `Payment failure for ${paymentData.paymentId} recorded`,
        eventType: webhookEvent.event_type || webhookEvent.type
    };
}

async function handlePaymentRefunded(webhookEvent, source) {
    console.log(`Payment refunded from ${source}:`, webhookEvent.id);
    
    // Handle refund processing
    // 1. Update database
    // 2. Revoke course access if applicable
    // 3. Send refund confirmation email
    
    return {
        message: 'Refund processed successfully',
        eventType: webhookEvent.event_type || webhookEvent.type
    };
}

async function handleSubscriptionCreated(webhookEvent, source) {
    console.log(`Subscription created from ${source}:`, webhookEvent.id);
    
    // Handle subscription creation
    // 1. Create subscription record in database
    // 2. Grant initial course access
    // 3. Send welcome email
    
    return {
        message: 'Subscription created successfully',
        eventType: webhookEvent.event_type || webhookEvent.type
    };
}

async function handleSubscriptionCancelled(webhookEvent, source) {
    console.log(`Subscription cancelled from ${source}:`, webhookEvent.id);
    
    // Handle subscription cancellation
    // 1. Update subscription status in database
    // 2. Handle access revocation based on your policy
    // 3. Send cancellation confirmation email
    
    return {
        message: 'Subscription cancellation processed',
        eventType: webhookEvent.event_type || webhookEvent.type
    };
}

async function verifyPayPalSignature(headers, body) {
    // PayPal webhook signature verification
    // This is a simplified version - implement full verification as per PayPal docs
    const transmissionId = headers['paypal-transmission-id'];
    const certId = headers['paypal-cert-id'];
    const signature = headers['paypal-transmission-sig'];
    const timestamp = headers['paypal-transmission-time'];
    
    if (!transmissionId || !certId || !signature || !timestamp) {
        console.log('Missing PayPal signature headers');
        return false;
    }
    
    // In production, implement full signature verification
    // For now, just check that required headers are present
    console.log('PayPal signature verification - headers present');
    return true;
}

function verifyStripeSignature(body, signature) {
    // Stripe webhook signature verification
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
        console.log('Stripe webhook secret not configured');
        return false;
    }
    
    if (!signature) {
        console.log('Missing Stripe signature');
        return false;
    }
    
    // In production, implement full signature verification using Stripe SDK
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // return stripe.webhooks.constructEvent(body, signature, webhookSecret);
    
    console.log('Stripe signature verification - signature present');
    return true;
}