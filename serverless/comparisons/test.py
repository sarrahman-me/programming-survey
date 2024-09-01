from handlers import get_all_comparisons, add_comparison
import json


def test_get_all_comparisons():
    response = get_all_comparisons()

    data = json.loads(response["body"])["data"]

    assert response["statusCode"] == 200
    assert isinstance(data, list)

    if response["statusCode"] != 200:
        error_detail = json.loads(response["body"])
        print("Error detail:", error_detail)


def test_add_new_comparison():
    response = add_comparison(22, 23, 22)

    print("Response from add_comparison:", response)

    assert response["statusCode"] == 200

    if response["statusCode"] != 200:
        error_detail = json.loads(response["body"])
        print("Error detail:", error_detail)
