import json
from handlers import (
    add_language,
    get_language_by_id,
    get_all_language,
    get_comparison,
    update_stats,
)


def lambda_handler(event, context):
    http_method = event.get("httpMethod")
    resource_path = event.get("resource")

    if http_method == "POST" and resource_path == "/language":
        body = json.loads(event["body"])
        language_name = body["name"]
        url_image = body["url_image"]

        return add_language(language_name, url_image)

    elif http_method == "GET" and resource_path == "/language":
        return get_all_language()

    elif http_method == "GET" and resource_path.startswith("/language/"):
        language_id = event["pathParameters"]["id"]
        return get_language_by_id(language_id)

    elif http_method == "POST" and resource_path == "/language/match":
        body = json.loads(event["body"])
        liked_lang = body["liked_language_id"] or None
        exclude_langs = body["exclude_language_ids"] or []

        return get_comparison(liked_lang, exclude_langs)
    elif http_method == "PATCH" and resource_path == "/language/stats":
        language_id = event["pathParameters"]["id"]

        body = json.loads(event["body"])
        status = body["status"]

        return update_stats(language_id, status)

    else:
        return {
            "statusCode": 405,
            "body": json.dumps({"message": "Method Not Allowed"}),
            "headers": {"Content-Type": "application/json"},
        }
