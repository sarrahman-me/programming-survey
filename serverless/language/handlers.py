import os
import json
from supabase import Client, create_client
from dotenv import load_dotenv

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
language_table = supabase.table("language")


def add_language(name, url_image):
    try:
        existing_data = language_table.select("*").eq("name", name).execute()

        if existing_data.data:
            return {
                "statusCode": 409,
                "body": json.dumps({"message": f"Language '{name}' already exists."}),
                "headers": {"Content-Type": "application/json"},
            }

        response = language_table.insert(
            {"name": name, "url_image": url_image}
        ).execute()

        return {
            "statusCode": 200,
            "body": json.dumps(
                {"message": "Language added successfully", "data": response.data}
            ),
            "headers": {"Content-Type": "application/json"},
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
            "headers": {"Content-Type": "application/json"},
        }


def get_all_language():
    try:
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


def get_language_by_id(language_id):
    try:
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
