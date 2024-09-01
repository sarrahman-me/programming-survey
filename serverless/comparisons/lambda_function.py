import json

from handlers import get_all_comparisons, add_comparison


def lambda_handler(event, context):
    http_method = event.get("httpMethod")
    resource_path = event.get("resource")

    if http_method == "POST" and resource_path == "/comparisons":
        body = json.loads(event["body"])
        language_a_id = body["language_a_id"]
        language_b_id = body["language_b_id"]
        winner_language_id = body["winner_language_id"]

        return add_comparison(language_a_id, language_b_id, winner_language_id)

    elif http_method == "GET" and resource_path == "/comparisons":
        query_params = event.get("queryStringParameters") or {}

        page = int(query_params.get("page", 1))
        limit = int(query_params.get("limit", 25))

        return get_all_comparisons(page, limit)

    else:
        return {
            "statusCode": 405,
            "body": json.dumps({"message": "Method Not Allowed"}),
            "headers": {"Content-Type": "application/json"},
        }
