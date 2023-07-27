import json

def parse_data(filepath):
    try:
        with open(filepath, 'r') as json_file:
            data = json.load(json_file)
            return data
    except FileNotFoundError:
        raise FileNotFoundError(f"File not found: {filepath}")
    except json.JSONDecodeError:
        raise json.JSONDecodeError(f"JSON decoding error: {filepath}")
