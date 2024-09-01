import json
import os

import requests
from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
comparison_table = supabase.table("comparisons")
lambda_language_url: str = os.environ.get("LANGUAGE_LAMBDA")


def get_all_comparisons(page: int = 1, limit: int = 25):
    try:
        offset = (page - 1) * limit

        response = (
            comparison_table.select("*", count="exact")
            .offset(offset)
            .limit(limit)
            .execute()
        )

        total_data = response.count
        total_pages = (total_data + limit - 1) // limit if limit > 0 else 0

        metadata = {
            "page": page,
            "limit": limit,
            "total_data": total_data,
            "total_pages": total_pages,
        }

        return {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "message": "Comparisons retrieved successfully",
                    "data": response.data,
                    "metadata": metadata,
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


def add_comparison(language_a_id, language_b_id, winner_language_id):
    try:
        response = comparison_table.insert(
            {
                "language_a_id": language_a_id,
                "language_b_id": language_b_id,
                "winner_language_id": winner_language_id,
            }
        ).execute()

        if language_a_id == winner_language_id:
            update_stats_lang(language_a_id, "wins")
            update_stats_lang(language_b_id, "losses")

        return {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "message": "Comparison added successfully",
                    "data": response.data,
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


def update_stats_lang(id_language, status):
    headers = {"Content-Type": "application/json", "Accept": "application/json"}
    payload = {"status": status}

    try:
        response = requests.patch(
            f"{lambda_language_url}/{id_language}",
            json=payload,
            headers=headers,
            timeout=10,
        )

        response.raise_for_status()
        print(response.json())
    except requests.exceptions.RequestException as e:
        print(f"Failed to update language stats: {e}")
