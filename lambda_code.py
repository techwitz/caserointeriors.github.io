import json
import boto3

SENDER = "souryavatsyayan@gmail.com"
RECIPIENT = "souryavatsyayan@gmail.com"
AWS_REGION = "us-east-1"
SUBJECT = "[CASERO] A new person registered"
CHARSET = "UTF-8"

CLIENT = boto3.client("ses", region_name=AWS_REGION)


def lambda_handler(event, context):
    name = event.get("name")
    email = event.get("email")
    phone = event.get("phone")

    try:
        send_email(
            name, email, phone    
        )

    except Exception as e:
        return {
            "status": e
        }

    return {
        "status": "success"
    }
    
    
def send_email(name, email, phone):
    
    body_text = "Name: {}\nPhone: {}\nEmail: {}".format(name, email, phone)

    resp = CLIENT.send_email(
        Destination={
            'ToAddresses': [
                RECIPIENT,
            ],
        },
        Message={
            'Body': {
                'Text': {
                    'Charset': CHARSET,
                    'Data': body_text,
                },
            },
            'Subject': {
                'Charset': CHARSET,
                'Data': SUBJECT,
            },
        },
        Source=SENDER
    )
