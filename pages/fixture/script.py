import pandas as pd
import json

# 엑셀 파일의 경로와 JSON 파일의 경로
excel_file_path = 'people.xlsx'
json_file_path = 'people.json'

# 엑셀 파일을 DataFrame으로 읽어옵니다.
df = pd.read_excel(excel_file_path)

# DataFrame을 Python의 리스트 형태로 변환합니다.
data = df.to_dict(orient='records')

# JSON 파일에 데이터를 저장합니다.
with open(json_file_path, 'w', encoding='utf-8') as json_file:
    json.dump(data, json_file, indent=2, ensure_ascii=False)

print("데이터가 성공적으로 people.json 파일로 저장되었습니다.")
