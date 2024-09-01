import json
import os

from dotenv import load_dotenv
from supabase import Client, create_client

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

    except ValueError as e:
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

    except ValueError as e:
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

    except ValueError as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
            "headers": {"Content-Type": "application/json"},
        }


def get_comparison(liked_language_id: int = None, excluded_language_ids: list = None):
    try:
        if liked_language_id:
            response = (
                language_table.select("*")
                .not_.in_("id", excluded_language_ids or [])
                .neq("id", liked_language_id)
                .limit(1)
                .execute()
            )

            if not response.data:
                return {
                    "statusCode": 404,
                    "body": json.dumps(
                        {"message": "No languages available for comparison."}
                    ),
                    "headers": {"Content-Type": "application/json"},
                }

            liked_language = (
                language_table.select("*").eq("id", liked_language_id).execute()
            )

            return {
                "statusCode": 200,
                "body": json.dumps(
                    {
                        "message": "Language retrieved successfully",
                        "data": [liked_language.data[0], response.data[0]],
                    }
                ),
                "headers": {"Content-Type": "application/json"},
            }
        else:
            response = language_table.select("*").limit(2).execute()

            return {
                "statusCode": 200,
                "body": json.dumps(
                    {
                        "message": "Languages retrieved successfully",
                        "data": response.data,
                    }
                ),
                "headers": {"Content-Type": "application/json"},
            }
    except ValueError as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
            "headers": {"Content-Type": "application/json"},
        }


def update_stats(id_language, status):
    try:
        response_lang = language_table.select("*").eq("id", id_language).execute()

        language = response_lang.data[0]

        if status == "wins":
            language_table.update({"wins": language["wins"] + 1}).eq(
                "id", id_language
            ).execute()
        elif status == "losses":
            language_table.update({"losses": language["losses"] + 1}).eq(
                "id", id_language
            ).execute()
        else:
            pass

        return {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "message": "Languages updated successfully",
                    "data": "OK",
                }
            ),
            "headers": {"Content-Type": "application/json"},
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"message": "Internal server error", "error": str(e)}),
            "headers": {"Content-Type": "application/json"},
        }
