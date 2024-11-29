import base64

with open('1.txt', 'r') as f:
    data = f.read()
    print(base64.b64encode(data).decode('utf-8'))   

