import json
import os

from dotenv import load_dotenv
from supabase import Client, create_client

load_dotenv()

url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)
comparison_table = supabase.table("comparisons")


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

        return {
            "statusCode": 200,
            "body": json.dumps(
                {
                    "message": "Comparisons added successfully",
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
