from handlers import add_language, get_all_language, get_language_by_id
import json


def test_add_language():
    response = add_language(name="C", url_image="Image dummy")

    assert response["statusCode"] == 200
    assert json.loads(response["body"])["message"] == "Language added successfully"


def test_add_language_conflict():
    response = add_language(name="C", url_image="Image dummy")

    assert response["statusCode"] == 409
    assert json.loads(response["body"])["message"] == "Language 'C' already exists."


def test_get_all_language():
    response = get_all_language()

    assert response["statusCode"] == 200
    data = json.loads(response["body"])["data"]
    assert isinstance(data, list)


def test_get_language_by_id():
    response = get_language_by_id(18)

    assert response["statusCode"] == 200
    assert json.loads(response["body"])["message"] == "Language retrieved successfully"
