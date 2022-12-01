with open('input', 'r') as f:
    data = f.readlines()
    result = 0
    print(len(data))
    for index, line in enumerate(data):
        if index == 0:
            prev = int(line)
            continue
 
        if int(line) > prev:
            result += 1
            print(prev, int(line))
        prev = int(line)
 
    print(result)
