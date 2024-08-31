import os
import json
from supabase import Client, create_client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Supabase client
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
language_table = supabase.table("language")


def add_language(event):
    try:
        # Parse the request body
        body = json.loads(event["body"])
        language_name = body["name"]

        # Check if the language already exists
        existing_data = language_table.select("*").eq("name", language_name).execute()

        if existing_data.data:
            # If language already exists, return a 409 Conflict status
            return {
                "statusCode": 409,
                "body": json.dumps(
                    {"message": f"Language '{language_name}' already exists."}
                ),
                "headers": {"Content-Type": "application/json"},
            }

        # Insert the new language into the database
        response = language_table.insert(
            {"name": language_name, "url_image": "Image dummy di sini"}
        ).execute()

        # Return success response
        return {
            "statusCode": 200,
            "body": json.dumps(
                {"message": "Language added successfully", "data": response.data}
            ),
            "headers": {"Content-Type": "application/json"},
        }

    except Exception as e:
        # Handle any errors that occur during processing
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
            "headers": {"Content-Type": "application/json"},
        }


def get_all_language(event):
    try:
        # Implement your GET method logic here for listing all languages
        response = language_table.select("*").execute()

        return {
            "statusCode": 200,
            "body": json.dumps(
                {"message": "Languages retrieved successfully", "data": response.data}
            ),
            "headers": {"Content-Type": "application/json"},
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
            "headers": {"Content-Type": "application/json"},
        }


def get_language_by_id(event):
    try:
        # Extract ID from the path
        path_parameters = event.get("pathParameters", {})
        language_id_str = path_parameters.get("id")

        language_id = int(language_id_str)

        # Query database by ID
        response = language_table.select("*").eq("id", language_id).execute()

        if response.data:
            return {
                "statusCode": 200,
                "body": json.dumps(
                    {
                        "message": "Language retrieved successfully",
                        "data": response.data,
                    }
                ),
                "headers": {"Content-Type": "application/json"},
            }
        else:
            return {
                "statusCode": 404,
                "body": json.dumps({"message": "Language not found"}),
                "headers": {"Content-Type": "application/json"},
            }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
            "headers": {"Content-Type": "application/json"},
        }
