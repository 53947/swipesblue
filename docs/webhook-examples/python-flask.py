"""
SwipesBlue Webhook Receiver - Python / Flask Example

This example shows how to receive and verify SwipesBlue webhook events
in a Python Flask application.
"""

from flask import Flask, request, jsonify
import hmac
import hashlib
import os
import logging
from datetime import datetime, timedelta
from typing import Dict, Any
import json

# For async processing (optional)
from threading import Thread
from functools import wraps

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Your webhook secret (from environment variable)
WEBHOOK_SECRET = os.environ.get('SWIPESBLUE_WEBHOOK_SECRET')

# In-memory cache for processed events (use Redis in production)
processed_events = {}


def verify_webhook_signature(payload: str, signature: str, secret: str) -> bool:
    """
    Verify webhook signature using HMAC-SHA256

    Args:
        payload: Raw request body as string
        signature: Signature from X-Webhook-Signature header
        secret: Your webhook secret

    Returns:
        True if signature is valid
    """
    if not payload or not signature or not secret:
        return False

    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()

    # Timing-safe comparison
    return hmac.compare_digest(expected_signature, signature)


def async_task(f):
    """Decorator to run function in background thread"""
    @wraps(f)
    def wrapped(*args, **kwargs):
        thread = Thread(target=f, args=args, kwargs=kwargs)
        thread.daemon = True
        thread.start()
    return wrapped


@async_task
def process_webhook_async(event_type: str, timestamp: str, data: Dict[str, Any]):
    """
    Process webhook asynchronously

    In production, use a proper task queue like Celery, RQ, or Dramatiq
    """
    try:
        event_id = get_event_id(event_type, data, timestamp)

        # Check for duplicate events (idempotency)
        if is_event_processed(event_id):
            logger.info(f"Event already processed: {event_id}")
            return

        logger.info(f"Processing webhook: {event_type} - {event_id}")

        # Route to appropriate handler
        handlers = {
            'payment.success': handle_payment_success,
            'payment.failed': handle_payment_failed,
            'payment.refunded': handle_payment_refunded,
            'merchant.created': handle_merchant_created,
            'merchant.approved': handle_merchant_approved,
            'merchant.suspended': handle_merchant_suspended,
        }

        handler = handlers.get(event_type)
        if handler:
            handler(data)
        else:
            logger.warning(f"Unknown event type: {event_type}")

        # Mark as processed
        mark_event_processed(event_id)

        logger.info(f"Webhook processed successfully: {event_id}")

    except Exception as e:
        logger.error(f"Error processing webhook: {e}", exc_info=True)


def handle_payment_success(data: Dict[str, Any]) -> None:
    """Handle payment.success event"""
    logger.info(f"Payment successful: {data['transactionId']}")

    # Update order in your database
    update_order(data['platformOrderId'], {
        'status': 'paid',
        'payment_status': 'paid',
        'transaction_id': data['transactionId'],
        'gateway_transaction_id': data['gatewayTransactionId'],
        'auth_code': data['authCode'],
        'paid_at': datetime.utcnow(),
    })

    # Send confirmation email
    send_payment_confirmation_email(
        data['customerEmail'],
        order_id=data['platformOrderId'],
        amount=data['amount'],
        transaction_id=data['transactionId'],
    )

    logger.info(f"Order updated: {data['platformOrderId']}")


def handle_payment_failed(data: Dict[str, Any]) -> None:
    """Handle payment.failed event"""
    logger.info(f"Payment failed: {data['transactionId']}")

    # Update order status
    update_order(data['platformOrderId'], {
        'status': 'payment_failed',
        'payment_status': 'failed',
        'payment_error': data['errorMessage'],
    })

    # Notify customer
    send_payment_failed_email(
        data['customerEmail'],
        order_id=data['platformOrderId'],
        error_message=data['errorMessage'],
    )


def handle_payment_refunded(data: Dict[str, Any]) -> None:
    """Handle payment.refunded event"""
    logger.info(f"Payment refunded: {data['transactionId']}")

    status = 'refunded' if data['isFullyRefunded'] else 'partially_refunded'

    # Update order
    update_order(data['platformOrderId'], {
        'status': status,
        'payment_status': status,
        'refunded_amount': data['totalRefunded'],
        'refund_reason': data.get('reason'),
        'refunded_at': datetime.utcnow(),
    })

    # Notify customer
    send_refund_confirmation_email(
        data['customerEmail'],
        order_id=data['platformOrderId'],
        refund_amount=data['refundAmount'],
        is_full_refund=data['isFullyRefunded'],
    )


def handle_merchant_created(data: Dict[str, Any]) -> None:
    """Handle merchant.created event"""
    logger.info(f"Merchant created: {data['merchantId']}")

    # Update client record
    update_client(data['platformClientId'], {
        'swipesblue_merchant_id': data['merchantId'],
        'nmi_merchant_id': data['nmiMerchantId'],
        'merchant_status': data['status'],
        'merchant_application_id': data['applicationId'],
    })

    # Notify client
    send_merchant_created_email(
        data['businessEmail'],
        business_name=data['businessName'],
        status=data['status'],
    )


def handle_merchant_approved(data: Dict[str, Any]) -> None:
    """Handle merchant.approved event"""
    logger.info(f"Merchant approved: {data['merchantId']}")

    # Update client record
    update_client(data['platformClientId'], {
        'merchant_status': 'active',
        'merchant_approved_at': datetime.utcnow(),
        'can_accept_payments': True,
    })

    # Enable payment processing
    enable_payment_processing(data['platformClientId'])

    # Notify client
    send_merchant_approved_email(
        data['businessEmail'],
        business_name=data['businessName'],
    )


def handle_merchant_suspended(data: Dict[str, Any]) -> None:
    """Handle merchant.suspended event"""
    logger.info(f"Merchant suspended: {data['merchantId']}")

    # Update client record
    update_client(data['platformClientId'], {
        'merchant_status': 'suspended',
        'merchant_suspended_at': datetime.utcnow(),
        'can_accept_payments': False,
    })

    # Disable payment processing
    disable_payment_processing(data['platformClientId'])

    # Notify client
    send_merchant_suspended_email(
        data['businessEmail'],
        business_name=data['businessName'],
    )


def get_event_id(event_type: str, data: Dict[str, Any], timestamp: str) -> str:
    """Generate unique event ID for idempotency"""
    identifier = data.get('transactionId') or data.get('merchantId') or 'unknown'
    return f"{event_type}-{identifier}-{timestamp}"


def is_event_processed(event_id: str) -> bool:
    """Check if event was already processed"""
    # In production, use Redis:
    # return redis_client.exists(f"webhook:{event_id}")
    return event_id in processed_events


def mark_event_processed(event_id: str) -> None:
    """Mark event as processed"""
    # In production, use Redis with TTL:
    # redis_client.setex(f"webhook:{event_id}", 86400, "1")  # 24 hour TTL
    processed_events[event_id] = datetime.utcnow()


# Placeholder functions - implement based on your application
def update_order(order_id: str, updates: Dict[str, Any]) -> None:
    """Update order in your database"""
    logger.info(f"Updating order: {order_id} - {updates}")
    # Implement your database update logic here


def update_client(client_id: str, updates: Dict[str, Any]) -> None:
    """Update client in your database"""
    logger.info(f"Updating client: {client_id} - {updates}")
    # Implement your database update logic here


def send_payment_confirmation_email(email: str, **kwargs) -> None:
    """Send payment confirmation email"""
    logger.info(f"Sending payment confirmation to: {email}")
    # Implement your email sending logic here


def send_payment_failed_email(email: str, **kwargs) -> None:
    """Send payment failed notification"""
    logger.info(f"Sending payment failed notification to: {email}")


def send_refund_confirmation_email(email: str, **kwargs) -> None:
    """Send refund confirmation email"""
    logger.info(f"Sending refund confirmation to: {email}")


def send_merchant_created_email(email: str, **kwargs) -> None:
    """Send merchant created notification"""
    logger.info(f"Sending merchant created notification to: {email}")


def send_merchant_approved_email(email: str, **kwargs) -> None:
    """Send merchant approved notification"""
    logger.info(f"Sending merchant approved notification to: {email}")


def send_merchant_suspended_email(email: str, **kwargs) -> None:
    """Send merchant suspended notification"""
    logger.info(f"Sending merchant suspended notification to: {email}")


def enable_payment_processing(client_id: str) -> None:
    """Enable payment processing for client"""
    logger.info(f"Enabling payment processing for client: {client_id}")


def disable_payment_processing(client_id: str) -> None:
    """Disable payment processing for client"""
    logger.info(f"Disabling payment processing for client: {client_id}")


@app.route('/webhooks/swipesblue', methods=['POST'])
def webhook_handler():
    """Main webhook endpoint"""
    try:
        # Get signature from header
        signature = request.headers.get('X-Webhook-Signature')
        event_type = request.headers.get('X-Webhook-Event')
        timestamp = request.headers.get('X-Webhook-Timestamp')

        if not signature or not event_type:
            logger.error('Missing webhook headers')
            return jsonify({'error': 'Missing headers'}), 400

        # Get raw body for signature verification
        payload = request.get_data(as_text=True)

        # Verify signature
        if not verify_webhook_signature(payload, signature, WEBHOOK_SECRET):
            logger.error('Invalid webhook signature')
            return jsonify({'error': 'Invalid signature'}), 401

        # Parse JSON data
        data = request.get_json()

        logger.info(f"Received webhook: {event_type} at {timestamp}")

        # Acknowledge receipt immediately
        # Process asynchronously
        process_webhook_async(event_type, timestamp, data['data'])

        return jsonify({'status': 'ok'}), 200

    except Exception as e:
        logger.error(f"Webhook error: {e}", exc_info=True)
        return jsonify({'error': 'Internal server error'}), 500


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy'}), 200


if __name__ == '__main__':
    if not WEBHOOK_SECRET:
        logger.warning('SWIPESBLUE_WEBHOOK_SECRET not set!')

    # Run Flask app
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=os.environ.get('FLASK_ENV') == 'development'
    )


"""
Production Deployment with Celery

For production, use Celery for async processing:

# tasks.py
from celery import Celery
import os

celery_app = Celery(
    'swipesblue_webhooks',
    broker=os.environ.get('REDIS_URL', 'redis://localhost:6379/0')
)

@celery_app.task
def process_webhook_task(event_type, timestamp, data):
    # Same processing logic as process_webhook_async
    pass

# In webhook_handler:
process_webhook_task.delay(event_type, timestamp, data['data'])
"""

"""
Environment Variables (.env file):

SWIPESBLUE_WEBHOOK_SECRET=your_webhook_secret_here
SWIPESBLUE_API_KEY=your_api_key_here
SWIPESBLUE_API_SECRET=your_api_secret_here

# For Celery
REDIS_URL=redis://localhost:6379/0

# Flask
FLASK_ENV=production
PORT=5000
"""

"""
Requirements (requirements.txt):

flask==3.0.0
gunicorn==21.2.0
celery==5.3.4
redis==5.0.1
"""

"""
Run the application:

Development:
$ export SWIPESBLUE_WEBHOOK_SECRET=your_secret
$ python python-flask.py

Production with Gunicorn:
$ gunicorn -w 4 -b 0.0.0.0:5000 python-flask:app

With Celery worker:
$ celery -A tasks worker --loglevel=info
"""
