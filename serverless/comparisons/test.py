from handlers import get_all_comparisons
import json


def test_get_all_comparisons():
    response = get_all_comparisons()

    assert response["statusCode"] == 200
    data = json.loads(response["body"])["data"]
    assert isinstance(data, list)
