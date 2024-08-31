from handlers import add_language, get_all_language, get_language_by_id
import json


def test_add_language():
    # Add a new language
    event = {"body": '{"name": "C"}'}
    response = add_language(event)

    assert response["statusCode"] == 200
    assert json.loads(response["body"])["message"] == "Language added successfully"


def test_add_language_conflict():
    # Add the same language again to test conflict
    event = {"body": '{"name": "C"}'}
    response = add_language(event)

    assert response["statusCode"] == 409
    assert json.loads(response["body"])["message"] == "Language 'C' already exists."


def test_get_all_language():
    # Ensure that there is at least one language to retrieve
    event = {}
    response = get_all_language(event)

    assert response["statusCode"] == 200
    data = json.loads(response["body"])["data"]
    assert isinstance(data, list)  # Assuming data should be a list


def test_get_language_by_id():
    # Ensure that there is a language with a known ID
    # Insert a sample language with ID 1 for testing
    # In a real test, you would mock the database or use a test database
    # This is a simple example assuming ID 1 exists
    event = {"pathParameters": {"id": 1}}
    response = get_language_by_id(event)

    assert response["statusCode"] == 200
    assert json.loads(response["body"])["message"] == "Language retrieved successfully"
