import json
from handlers import add_language, get_language_by_id, get_all_language


def lambda_handler(event, context):
    http_method = event.get("httpMethod")
    resource_path = event.get("resource")

    if http_method == "POST" and resource_path == "/language":
        body = json.loads(event["body"])
        language_name = body["name"]
        url_image = body["url_image"]

        return add_language(language_name, url_image)

    elif http_method == "GET" and resource_path == "/language":
        return get_all_language(event)

    elif http_method == "GET" and resource_path.startswith("/language/"):
        language_id = event["pathParameters"]["id"]
        return get_language_by_id(language_id)

    else:
        return {
            "statusCode": 405,
            "body": json.dumps({"message": "Method Not Allowed"}),
            "headers": {"Content-Type": "application/json"},
        }
