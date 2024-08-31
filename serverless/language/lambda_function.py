import json
from handlers import add_language, get_language_by_id, get_all_language


def lambda_handler(event, context):
    http_method = event.get("httpMethod")
    resource_path = event.get("resource")
    path_parameters = event.get("pathParameters", {})

    if http_method == "POST" and resource_path == "/language":
        return add_language(event)
    elif http_method == "GET" and resource_path == "/language":
        return get_all_language(event)
    elif http_method == "GET" and resource_path.startswith("/language/"):
        # Extract the ID from the path
        language_id = resource_path.split("/")[-1]
        event["pathParameters"] = {"id": language_id}
        return get_language_by_id(event)
    else:
        return {
            "statusCode": 405,  # Method Not Allowed
            "body": json.dumps({"message": "Method Not Allowed"}),
            "headers": {"Content-Type": "application/json"},
        }
